"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/hooks/useAlert";
import { createMemory } from "@/app/actions/memories";
import { MemoryFormData } from "@/types/memory";
import MemoryForm from "@/components/ui/forms/MemoryForm";

export default function CreateMemoryForm() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleSubmit = useCallback(
    async (memory: MemoryFormData) => {
      if (!memory.image) {
        showAlert("Please select an image.", "error", 3000);
        throw new Error("Please select an image.");
      }

      const formData = new FormData();
      formData.append("image", memory.image);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const message = await uploadResponse.json();
        showAlert(message.error, "error", 3000);
        throw new Error(message);
      }

      const { url } = await uploadResponse.json();

      await createMemory({
        title: memory.title,
        description: memory.description,
        image: url,
        date: memory.date,
      });

      showAlert("Memory created successfully", "success", 3000);

      router.push("/");
    },
    [router, showAlert]
  );

  return <MemoryForm onSubmit={handleSubmit} />;
}
