"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface SubmissionSuccessProps {
  onClose?: () => void;
}

function SubmissionSuccess({ onClose }: SubmissionSuccessProps) {
  // lock body scroll while modal is mounted
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <Image
            src="/icons/checkmark-circle.png"
            alt="Success"
            width={50}
            height={50}
          />
          <button
            type="button"
            onClick={onClose}
            className="text-grey-400 hover:text-grey-600"
          >
            <Image
              src="/icons/close.png"
              alt="Close"
              width={20}
              height={20}
            />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[#181D27]">
            Submission Successful
          </h3>
          <p className="text-[#535862]">
            Your supervisor will be notified so they can begin reviewing.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/">
            <Button
              variant="default"
              className="w-full py-6 bg-blue-500 text-white text-lg cursor-pointer hover:bg-blue-800"
            >
              <Image
                src="/icons/home-white.png"
                alt="Home"
                width={20}
                height={20}
                className="mr-2"
              />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccess;
