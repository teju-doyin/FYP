import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type FeedbackSentProps = {
  open: boolean;
  onClose: () => void;
  studentName: string;
};

function FeedbackSent({ open, onClose, studentName }: FeedbackSentProps) {
  if (!open) return null;

  return (
    <div className="modal-background inset-0">
      <div className="modal-box">
        <div className="w-[90%] mx-auto mb-9">
          <div className="flex-between pb-3 pt-5">
            <Image
              src="/icons/checkmark-circle.png"
              alt="Success"
              width={50}
              height={50}
            />
            <button type="button" onClick={onClose}>
              <Image
                src="/icons/close.png"
                alt="Close"
                width={20}
                height={20}
              />
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#181D27]">
              Feedback Sent Successfully
            </h3>
            <p className="text-[#535862] mb-4">
              You&apos;ve completed the review and feedback has been sent to{" "}
              <span className="font-semibold">{studentName}</span>.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-[90%] mx-auto gap-4">
          <Link href="/supervisor/home">
            <Button
              variant="default"
              className="py-6 w-full bg-blue-500 text-white text-lg hover:text-white gap-2"
            >
              <Image
                src="/icons/home-white.png"
                alt="Home"
                width={20}
                height={20}
              />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeedbackSent;
