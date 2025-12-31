"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export type FeedbackStatus = "action-required" | "needs-correction" | "approved";

type FeedbackBoxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  text: string;
  status: FeedbackStatus;
  onTextChange: (value: string) => void;
  onStatusChange: (value: FeedbackStatus) => void;
  onSubmit: () => void;
  sending: boolean;
};


export function FeedbackBox({
  open,
  onOpenChange,
  text,
  status,
  onTextChange,
  onStatusChange,
  onSubmit,
  sending
}: FeedbackBoxProps) {
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w w-[95%] mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-blue-800 font-semibold text-[20px]">
              Feedback
            </DialogTitle>

            <DialogClose asChild>
              <button
                type="button"
                className="text-grey-300 text-xl leading-none"
              >
                ✕
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="mb-4">
          <Textarea
            placeholder="Write here ....."
            className="w-full mb-6 h-40 placeholder:text-grey-200 resize-none break-all"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
        />

          <RadioGroup
            value={status}
            onValueChange={(value) =>
              onStatusChange(value as FeedbackStatus)
            }
            className="space-y-1.5"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="action-required" id="r1" />
              <Label htmlFor="r1" className="text-red text-[18px]">
                Action Required
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem value="needs-correction" id="r2" />
              <Label htmlFor="r2" className="text-yellow text-[18px]">
                Needs Correction
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem value="approved" id="r3" />
              <Label htmlFor="r3" className="text-green text-[18px]">
                Approved
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col w-full mx-auto gap-4 pb-2">
          <Button
            variant="default"
            className="py-6 text-lg bg-blue-500 text-white"
            type="button"
            onClick={onSubmit}
          >
            {sending ? "Sending..." : "Finish Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FeedbackBox;
