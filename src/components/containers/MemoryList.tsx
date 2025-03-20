"use client";

import { Memory } from "@/types/memory";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { deleteMemory } from "@/app/actions";
import { useCallback, useState } from "react";
import MemoryCard from "../ui/cards/MemoryCard";
import DeleteMemoryModal from "@/components/ui/modals/DeleteMemoryModal";

type MemoryListProps = {
  memories: Memory[];
};

export default function MemoryList({ memories }: MemoryListProps) {
  const router = useRouter();
  const { showAlert } = useAlert();
  const [deleteMemoryId, setDeleteMemoryId] = useState<number | null>(null);

  const handleEdit = useCallback(
    (memoryId: number) => {
      router.push(`/edit/${memoryId}`);
    },
    [router]
  );

  const handleDelete = useCallback((memoryId: number) => {
    setDeleteMemoryId(memoryId);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deleteMemoryId) return;
    deleteMemory(deleteMemoryId);
    setDeleteMemoryId(null);

    // As the memories loads in the server, refresh the page to reflect the changes
    router.refresh();
    showAlert("Memory deleted successfully", "success", 3000);
  }, [deleteMemoryId, router, showAlert]);

  const handleCancelDelete = useCallback(() => {
    setDeleteMemoryId(null);
  }, []);

  return (
    <>
      <ul className="flex flex-wrap gap-8 justify-center md:justify-start">
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      {deleteMemoryId && (
        <DeleteMemoryModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}
