"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { updateMemory } from "@/app/actions";
import MemoryForm from "../ui/forms/MemoryForm";
import { Memory, MemoryFormData } from "@/types/memory";
type EditMemoryFormProps = {
  memory: Memory;
};

export default function EditMemoryForm({ memory }: EditMemoryFormProps) {
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleSubmit = useCallback(
    async (updatedMemory: MemoryFormData) => {
      await updateMemory(memory.id, {
        title: updatedMemory.title,
        description: updatedMemory.description,
        date: updatedMemory.date,
        image: memory.image,
      });
      showAlert("Memory updated successfully", "success", 3000);
      router.push("/");
    },
    [showAlert, memory.id, memory.image, router]
  );

  return <MemoryForm memory={memory} onSubmit={handleSubmit} />;
}
