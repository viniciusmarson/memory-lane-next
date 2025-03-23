"use client";

import { useCallback, useState } from "react";
import { Memory, MemoryFormData } from "@/types/memory";
import { isFutureDate, isNotValidDate } from "@/utils/date";

const styles = {
  label: "text-sm font-semibold text-black align-self-start",
  input: "border border-gray-300 p-2 rounded-md w-full",
  button: "bg-blue-500 text-white p-2 w-full",
  form: "flex flex-col gap-4 p-4 w-full items-start",
  errorText: "text-red-500",
} as const;

type MemoryFormProps = {
  memory?: Memory;
  onSubmit: (memory: MemoryFormData) => Promise<void>;
};

const ONE_MB = 1024 * 1024;
const MAX_FILE_SIZE_MB = 5;

export default function MemoryForm({ memory, onSubmit }: MemoryFormProps) {
  const [title, setTitle] = useState(memory?.title || "");
  const [description, setDescription] = useState(memory?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [date, setDate] = useState(memory?.date || "");
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

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

        if (fileSizeMB > MAX_FILE_SIZE_MB) {
          setErrors(
            `File size exceeds ${MAX_FILE_SIZE_MB}MB. File size: ${fileSizeMB.toFixed(
              2
            )} MB`
          );
          return;
        }

        setErrors(null);
        setImage(file);
      }
    },
    []
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateString = e.target.value;
      setDate(dateString);

      if (isNotValidDate(dateString)) {
        setErrors("Invalid date");
        return;
      }

      if (isFutureDate(dateString)) {
        setErrors("Date cannot be in the future");
        return;
      }

      setErrors(null);
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="title" className={styles.label}>
        Title:
      </label>
      <input
        className={styles.input}
        placeholder="Give a title to your memory"
        value={title}
        onChange={handleTitleChange}
        maxLength={100}
        required
      />

      <label htmlFor="description" className={styles.label}>
        Description:
      </label>
      <textarea
        className={styles.input}
        placeholder="Tell everything about this memory"
        value={description}
        onChange={handleDescriptionChange}
        maxLength={1000}
        rows={6}
      />

      {!memory?.image && (
        <>
          <label htmlFor="image" className={styles.label}>
            Image:
          </label>
          <input
            type="file"
            className={styles.input}
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </>
      )}

      <label htmlFor="date" className={styles.label}>
        When did this happen?
      </label>
      <input
        type="date"
        className={styles.input}
        value={date}
        onChange={handleDateChange}
        required
      />

      {errors && <p className={styles.errorText}>{errors}</p>}

      <button
        type="submit"
        className={styles.button}
        disabled={uploading || !!errors}
      >
        {uploading ? "Loading..." : "Confirm"}
      </button>
    </form>
  );
}
