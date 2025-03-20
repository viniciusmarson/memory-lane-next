"use client";

import { useCallback, useState } from "react";
import { Memory, MemoryFormData } from "@/types/memory";

type MemoryFormProps = {
  memory?: Memory;
  onSubmit: (memory: MemoryFormData) => Promise<void>;
};

const ONE_MB = 1024 * 1024;
const MAX_FILE_SIZE = 5 * ONE_MB; // 5MB

export default function MemoryForm({ memory, onSubmit }: MemoryFormProps) {
  const [title, setTitle] = useState(memory?.title || "");
  const [description, setDescription] = useState(memory?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [date, setDate] = useState(memory?.date || "");
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const fileSizeMB = file.size / ONE_MB;

        if (fileSizeMB > MAX_FILE_SIZE) {
          setImageError(`File size exceeds ${MAX_FILE_SIZE}MB.`);
          return;
        }

        setImageError(null);
        setImage(file);
      }
    },
    []
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        setUploading(true);
        await onSubmit({ title, description, image, date });
      } catch (error) {
        console.error(error);
      } finally {
        setUploading(false);
      }
    },
    [title, description, image, date, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        className="border p-2"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        maxLength={100}
        required
      />
      <textarea
        className="border p-2"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        maxLength={1000}
      />

      {!memory?.image && (
        <>
          <input
            type="file"
            className="border p-2"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {imageError && <p style={{ color: "red" }}>{imageError}</p>}
        </>
      )}

      <input
        type="date"
        className="border p-2"
        value={date}
        onChange={handleDateChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2"
        disabled={uploading}
      >
        {uploading ? "Loading..." : "Confirm"}
      </button>
    </form>
  );
}
