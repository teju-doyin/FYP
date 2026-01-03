"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import PageLabel from "@/shared/components/PageLabel";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useCurrentChapter } from "@/lib/getCurrentChapter";
import { ChapterMeta, MilestoneStatus } from "@/types/ChapterData";
import { updateMilestoneStatusOnBackend } from "@/lib/updateMilestone";
import StatusModal from "@/shared/components/modals/MilestonStatus";

type ModalState = {
  open: boolean;
  milestoneId: number | null;
};

const Milestones = () => {
  const { user } = useAuth();
  const { currentChapterData, loading } = useCurrentChapter(user?.uid ?? null);

  const [modal, setModal] = useState<ModalState>({
    open: false,
    milestoneId: null,
  });
  const [localChapter, setLocalChapter] = useState<ChapterMeta | null>(null);
  const chapter = localChapter ?? currentChapterData ?? null;

  React.useEffect(() => {
    if (currentChapterData) setLocalChapter(currentChapterData);
  }, [currentChapterData]);

  const completed = useMemo(
    () => (chapter ? chapter.milestones.filter((m) => m.status === 2).length : 0),
    [chapter]
  );

  const progress = useMemo(() => {
    if (!chapter || chapter.milestones.length === 0) return 0;
    return (completed / chapter.milestones.length) * 100;
  }, [chapter, completed]);

  if (loading || !chapter || !user) return <p>Loading...</p>;

  const selected =
    chapter.milestones.find((m) => m.id === modal.milestoneId) ?? null;

  const handleOpenModal = (id: number) => {
    setModal({ open: true, milestoneId: id });
  };

  const handleCloseModal = () => {
    setModal({ open: false, milestoneId: null });
  };

  const handleStatusChange = async (status: MilestoneStatus) => {
    if (!chapter || modal.milestoneId === null) return;

    // optimistic local update
    const updated: ChapterMeta = {
      ...chapter,
      milestones: chapter.milestones.map((m) =>
        m.id === modal.milestoneId ? { ...m, status } : m
      ),
    };

    const completedCount = updated.milestones.filter((m) => m.status === 2).length;
    const newProgress =
      updated.milestones.length === 0
        ? 0
        : (completedCount / updated.milestones.length) * 100;

    setLocalChapter(updated);

    // backend is source of truth for status + chapter progress
    await updateMilestoneStatusOnBackend(
      user.uid,
      updated.id,              // chapter id
      modal.milestoneId,
      status,
      newProgress
    );
    console.log("updateMilestoneStatusOnBackend args", {
  userUid: user.uid,
  chapterId: updated.id,
  milestoneId: modal.milestoneId,
  status,
  newProgress,
});


    handleCloseModal();
  };

  return (
    <div className="my-18">
      <PageLabel label="Milestones" />

      <div className="flex gap-2 items-center text-center justify-center mb-5">
        <Image src="/icons/progress.png" alt="Progress" width={30} height={30} />
        <p className="text-grey-700 text-lg">
          <span className="font-semibold">{completed}</span> out of{" "}
          <span className="font-semibold">{chapter.milestones.length}</span>{" "}
          milestones complete
        </p>
      </div>

      <div className="w-[90%] mx-auto mb-30">
        {chapter.milestones.map((milestone) => (
          <div key={milestone.id} className="flex gap-4 items-center mb-4">
            <Checkbox
              className={`border data-[state=checked]:text-white data-[state=checked]:bg-green data-[state=checked]:border-green size-6 rounded-full
                ${
                  milestone.status === 0
                    ? "border-dashed border-grey-200"
                    : milestone.status === 1
                    ? "border-orange"
                    : "text-white bg-green border-green"
                }`}
              checked={milestone.status === 2}
              disabled
            />

            <div className="card w-[30rem] py-2">
              <div className="flex-between items-start">
                <h3 className="text-grey-600 font-semibold text-lg">
                  {milestone.title}
                </h3>
              </div>
              <p className="text-[14px] font-light mb-4">
                {milestone.description}
              </p>
              <div className="flex-between items-center">
                <span
                  className={`p-1.5 rounded-[3px] text-[12px]
                    ${
                      milestone.status === 0
                        ? "bg-[#4B4C54]/6 text-grey-300"
                        : milestone.status === 1
                        ? "bg-[#FAECE4] text-orange"
                        : "text-green bg-[#E1F0E6]"
                    }`}
                >
                  {milestone.status === 0
                    ? "Not Started"
                    : milestone.status === 1
                    ? "In Progress"
                    : "Complete"}
                </span>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => handleOpenModal(milestone.id)}
                >
                  <Image
                    src="/icons/edit.png"
                    alt="Edit"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <StatusModal
        open={modal.open && !!selected}
        onClose={handleCloseModal}
        title={selected?.title ?? ""}
        currentStatus={selected?.status ?? 0}
        onChangeStatus={handleStatusChange}
      />
    </div>
  );
};

export default Milestones;
