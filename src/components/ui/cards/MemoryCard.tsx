"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { Memory } from "@/types/memory";
import { formatDate } from "@/utils/date_format";
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

  const handleEdit = useCallback(() => {
    onEdit(id);
  }, [onEdit, id]);

  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [onDelete, id]);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link href={`/detail/${id}`}>
        <div className="relative w-full h-64">
          <Image src={image} alt={title} className="object-cover" fill />
        </div>
      </Link>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="text-gray-600 mb-1">{formatDate(date)}</p>
        <p className="mb-3 font-normal text-gray-700">
          {description}
        </p>

        <div className="flex gap-2 justify-center">
          <button
            className="text-black bg-transparent px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
            onClick={handleEdit}
          >
            <PencilIcon className="size-4" />
            Edit
          </button>

          <button
            className="text-black bg-transparent px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
            onClick={handleDelete}
          >
            <TrashIcon className="size-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
