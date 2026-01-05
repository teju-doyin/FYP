"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type AddNewTaskProps = {
  onClose: () => void;
  onSave: (title: string) => void;
};

function AddNewTask({ onClose, onSave }: AddNewTaskProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSave(title.trim());
    setTitle("");
  };

  return (
    <div className="modal-background">
      <div className="modal-box">
        <div className="w-[90%] mx-auto mb-7">
          <div className="flex-between items-center pb-3 pt-5">
            <h2 className="font-semibold text-[#181D27] text-xl">
              Add a new task
            </h2>
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
            <p className="text-[#414651] font-medium text-sm mb-2">
              Task Name*
            </p>
            <Input
              type="text"
              placeholder="Organize data collected"
              className="py4 h-12 placeholder:text-grey-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-[90%] mx-auto gap-4">
          <Button
            variant="default"
            className="py-6 bg-blue-500 text-white text-lg hover:text-blue-500"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewTask;
