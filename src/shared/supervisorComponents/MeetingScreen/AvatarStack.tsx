import Image from "next/image";

type Attendee = {
  id: string;
  name: string;
  avatarUrl: string;
};

interface AvatarStackProps {
  attendees: Attendee[];
  maxVisible?: number; // default 3
}

function AvatarStack({ attendees, maxVisible = 3 }: AvatarStackProps) {
  const visible = attendees.slice(0, maxVisible);
  const extraCount = attendees.length - visible.length;

  return (
    <div className="flex -space-x-3">
      {visible.map((person) => (
        <Image
          key={person.id}
          src={person.avatarUrl}
          alt={person.name}
          width={20}
          height={20}
          className="w-8 h-8 rounded-full border-1 border-white object-cover"
        />
      ))}

      {extraCount > 0 && (
        <div className="w-8 h-8 rounded-full bg-gray-200 border-1 border-white flex items-center justify-center text-xs font-medium text-gray-700">
          +{extraCount}
        </div>
      )}
    </div>
  );
}

export default AvatarStack;
