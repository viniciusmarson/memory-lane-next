import Link from "next/link";
import Image from "next/image";
import { Memory } from "@/types/memory";
import { formatDate } from "@/utils/date";
import DefaultButton from "@/components/buttons/DefaultButton";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type MemoryCardProps = {
  memory: Memory;
  onEdit: (memoryId: number) => void;
  onDelete: (memoryId: number) => void;
};

export default function MemoryCard({
  memory,
  onEdit,
  onDelete,
}: MemoryCardProps) {
  const { id, title, description, image, date } = memory;

  return (
    <div className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm h-130 w-80">
      <Link href={`/detail/${id}`}>
        <div className="relative w-full h-64">
          <Image src={image} alt={title} className="object-cover" fill />
        </div>
      </Link>

      <div className="flex flex-col gap-2 p-5">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>

        <p className="text-gray-600">{formatDate(date)}</p>

        <p className="font-normal text-gray-700 line-clamp-3">{description}</p>
      </div>

      <div className="flex gap-2 mt-auto mb-2 justify-center">
        <DefaultButton onClick={() => onEdit(id)}>
          <PencilIcon className="size-4" />
          Edit
        </DefaultButton>

        <DefaultButton onClick={() => onDelete(id)}>
          <TrashIcon className="size-4" />
          Delete
        </DefaultButton>
      </div>
    </div>
  );
}
