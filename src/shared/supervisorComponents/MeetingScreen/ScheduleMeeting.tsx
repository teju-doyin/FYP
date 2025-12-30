"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageLabel from "@/shared/components/PageLabel";
import Link from "next/link";
import AvatarStack from "./AvatarStack"; 
import Image from "next/image";
import TimeAndDataPicker from "./TimeAndDatePicker";

type Attendee = {
  id: string;
  name: string;
  avatarUrl: string;
};

const allAttendees: Attendee[] = [
   {
    id: "1",
    name: "Ada Lovelace",
    avatarUrl: "/pfp.png",
  },
  {
    id: "2",
    name: "Grace Hopper",
    avatarUrl: "/pfp-2.png",
  },
  {
    id: "3",
    name: "Alan Turing",
    avatarUrl: "/pfp-3.png",
  }
];

const ScheduleMeeting = () => {
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleAttendee = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedAttendees = allAttendees.filter((a) =>
    selectedIds.includes(a.id)
  );
  const allSelected = selectedIds.length === allAttendees.length;

    const handleSelectAll = () => {
    if (allSelected) {
        setSelectedIds([]);
    } else {
        setSelectedIds(allAttendees.map((a) => a.id));
    }
};


  return (
    <div>
      <PageLabel label="Schedule Meeting" />

      <form action="" className="space-y-6 w-[95%] mx-auto">
        <div>
          <p className="input-label">Subject*</p>
          <Input
            type="text"
            placeholder="What will be discussed"
            className="input-field"
          />
        </div>

        <TimeAndDataPicker/>

         {/* Add guests */}
        <div className="relative">
          <p className="input-label">Add guests</p>

          <button
            type="button"
            onClick={() => setIsGuestsOpen((o) => !o)}
            className="w-full flex items-center justify-between border rounded-lg px-3 py-2 bg-white card"
          >
            <div className="flex items-center gap-2">
              {selectedAttendees.length > 0 ? (
                <AvatarStack attendees={selectedAttendees} maxVisible={3} />
              ) : (
                <span className="text-sm text-gray-400">
                  Select students to invite
                </span>
              )}
            </div>
            <Image
              src="/icons/arrow-down.png"
              alt="Toggle guests"
              width={30}
              height={30}
            />
          </button>

          {isGuestsOpen && (
            <div className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-md max-h-60 overflow-y-auto">
              {/* Individual attendees */}
              {allAttendees.map((person) => {
                const isSelected = selectedIds.includes(person.id);
                return (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => toggleAttendee(person.id)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left ${
                      isSelected ? "bg-purple-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={person.avatarUrl}
                        alt={person.name}
                        width={30}
                        height={30}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-sm text-grey-700">
                        {person.name}
                      </span>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleSelectAll}
                className={`flex w-full items-center justify-between px-3 py-2 text-left border-t ${
                  allSelected ? "bg-purple-50" : "hover:bg-gray-50"
                }`}
              >
                <span className="text-sm text-gray-800">
                  {allSelected ? "Clear all" : "Select all"}
                </span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                    allSelected
                      ? "bg-purple-500 border-purple-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {allSelected ? "✓" : ""}
                </span>
              </button>
            </div>
          )}
        </div>

        <div>
          <p className="input-label">Meeting Link*</p>
          <Input
            type="text"
            placeholder="Google meet link"
            className="input-field mb-1"
          />
          <p className="text-sm">
            Don’t have one? Create{" "}
            <span>
              <Link
                href="https://meet.google.com"
                className="underline text-blue-500 font-medium"
              >
                here
              </Link>
            </span>
          </p>
        </div>
        <div className=" flex flex-col mx-auto gap-4 mt-20">
            <Button
                variant="default"
                className='py-7 bg-blue-500 text-white text-lg hover:text-blue-500'
            >
                
                Save
            </Button>
            
        </div>
      </form>
    </div>
  );
};

export default ScheduleMeeting;
