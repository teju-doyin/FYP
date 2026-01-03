"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import SupervisorNavbar from "./SupervisorNavbar";
import SelectChapterModal from "./modals/SelectChapterModal";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


function Navbar() {
  const { user } = useAuth();

  const pathname = usePathname();
  const router = useRouter();
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const studentUid = user?.uid;

  const isSupervisorRoute = pathname.startsWith("/supervisor");
  if (isSupervisorRoute) return <SupervisorNavbar />;

  const handleUploadClick = () => {
    setShowChapterModal(true);
  };

  const handleChapterContinue = (chapterId: number) => {
    setSelectedChapter(chapterId);
    setShowChapterModal(false);
    // Navigate to submission with chapter query param
    router.push(`/submission?chapter=${chapterId}`);
  };

  const handleChapterCancel = () => {
    setShowChapterModal(false);
    setSelectedChapter(null);
  };

  return (
    <>
      <div className="w-full fixed bottom-0 z-[99] bg-[#ffff] rounded-t-3xl shadow">
        <nav className="w-[90%] mx-auto flex-between bg-white">
          <div>
            <Link
              href="/"
              className={`text-[14px] ${
                pathname === "/" ? "nav-active" : "nav-inactive"
              }`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${
                    pathname === "/" ? "nav-home-active.png" : "nav-home.png"
                  }`}
                  alt="Home"
                  className="mx-auto"
                  width={20}
                  height={20}
                />
              </div>
              Home
            </Link>
          </div>

          <div>
            <Link
              href="/feedback"
              className={`text-[14px] ${
                pathname === "/feedback" ? "nav-active" : "nav-inactive"
              }`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${
                    pathname === "/feedback"
                      ? "nav-feedback-active.png"
                      : "nav-feedback.png"
                  }`}
                  alt="Feedback"
                  className="mx-auto"
                  width={20}
                  height={20}
                />
              </div>
              Feedback
            </Link>
          </div>

          {/* Upload button - now opens modal instead of direct link */}
          <div className="relative -top-6 border-4 rounded-full border-[#ffff]">
            <div className="px-4 py-3 bg-[#4E60D5] border-4 rounded-full border-[#A9C0FF]">
              <button
                onClick={pathname==="/submmission" ? undefined: handleUploadClick}
                disabled={pathname === "/submission"}
                className={`text-[14px] cursor-pointer ${
                  pathname === "/submission" ? "nav-active" : "nav-inactive"
                }`}
              >
                <div>
                  <Image
                    src={`/icons/${
                      pathname === "/submission"
                        ? "nav-upload-active.png"
                        : "nav-upload.png"
                    }`}
                    alt="Upload"
                    width={30}
                    height={30}
                  />
                </div>
              </button>
            </div>
          </div>

          <div>
            <Link
              href="/tasks"
              className={`text-[14px] ${
                pathname === "/tasks" ? "nav-active" : "nav-inactive"
              }`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${
                    pathname === "/tasks" ? "nav-tasks-active.png" : "nav-tasks.png"
                  }`}
                  alt="Tasks"
                  className="mx-auto"
                  width={20}
                  height={20}
                />
              </div>
              Tasks
            </Link>
          </div>

          <div>
            <Link
              href="/meeting"
              className={`text-[14px] ${
                pathname === "/meeting" ? "nav-active" : "nav-inactive"
              }`}
            >
              <div className="w-full">
                <Image
                  src={`/icons/${
                    pathname === "/meeting"
                      ? "nav-meeting-active.png"
                      : "nav-meeting.png"
                  }`}
                  alt="Meeting"
                  className="mx-auto"
                  width={20}
                  height={20}
                />
              </div>
              Meeting
            </Link>
          </div>
        </nav>
      </div>

      {/* Controlled Chapter Modal */}
      {showChapterModal && (
        <SelectChapterModal
        isOpen={showChapterModal}
        onClose={handleChapterCancel}
        onContinue={handleChapterContinue}
        studentUid={studentUid}
      />
      )}
    </>
  );
}

export default Navbar;
