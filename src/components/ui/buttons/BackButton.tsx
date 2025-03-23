"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBackPage = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button
      onClick={handleBackPage}
      className="bg-transparent text-blue-500 cursor-pointer"
    >
      Back
    </button>
  );
}
