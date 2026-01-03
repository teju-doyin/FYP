// src/lib/updateMilestone.ts
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MilestoneStatus } from "@/types/ChapterData";

export async function updateMilestoneStatusOnBackend(
  userUid: string,
  chapterId: number,
  milestoneId: number,
  status: MilestoneStatus,
  progress: number
) {
  const ref = doc(db, "users", userUid, "students", userUid);

  const chapterStatus =
    progress === 0
      ? "not_started"
      : progress === 100
      ? "complete"
      : "in_progress";

  console.log("updateMilestoneStatusOnBackend write", {
    path: ref.path,
    chapterId,
    milestoneId,
    status,
    progress,
    chapterStatus,
  });

  await updateDoc(ref, {
    [`chapters.${chapterId}.milestones.${milestoneId}.status`]: status,
    [`chapters.${chapterId}.progress`]: progress,
    [`chapters.${chapterId}.status`]: chapterStatus,
  });
}
