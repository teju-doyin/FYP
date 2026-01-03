// app/(wherever)/ChapterRequirements.tsx
import React from "react";
import Image from "next/image";
import { ChapterMeta } from "@/types/ChapterData";

interface Props {
  chapter?: ChapterMeta | null;
}

const ChapterRequirements = ({ chapter }: Props) => {
  if (!chapter) {
    // optionally show skeleton/loading; returning null is enough to stop the error
    return null;
  }
  return (
    <section className="w-[95%] mx-auto mb-8">
      <p className="text-grey-600 text-[18px] mb-3">
        Before you submit, make sure your {chapter.title} includes:
      </p>
      <li className="list-none">
        {chapter.checklist.map((item) => (
          <ul
            key={item.id}
            className="flex gap-2 items-start mb-4 text-grey-400"
          >
            <Image
              src="/icons/checkmark.png"
              className="mt-2"
              alt="Check"
              width={20}
              height={20}
            />
            <span>{item.title}</span>
          </ul>
        ))}
      </li>
    </section>
  );
};

export default ChapterRequirements;
