"use client";

import { useCallback } from "react";
import { Sort } from "@/types/memory";
import { useRouter } from "next/navigation";
interface SortControlsProps {
  currentSort: Sort;
}

export default function SortControls({ currentSort }: SortControlsProps) {
  const router = useRouter();

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newSort = e.target.value as Sort;
      router.push(`/?sort=${newSort}`);
    },
    [router]
  );

  return (
    <select
      value={currentSort}
      onChange={handleSortChange}
      className="text-black bg-white rounded-md p-2 border border-gray-300"
    >
      <option value="oldest">Older to newer</option>
      <option value="newest">Newer to older</option>
    </select>
  );
}
