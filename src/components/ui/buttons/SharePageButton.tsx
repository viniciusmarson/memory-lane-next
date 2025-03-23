"use client";

import { useCallback } from "react";
import { useAlert } from "@/hooks/useAlert";
import { ShareIcon } from "@heroicons/react/24/outline";

export default function SharePageButton() {
  const { showAlert } = useAlert();

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    showAlert("Link copied to clipboard", "success", 3000);
  }, [showAlert]);

  return (
    <button
      className="bg-transparent text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-gray-100"
      onClick={handleClick}
    >
      <ShareIcon className="size-4" />
    </button>
  );
}
