"use client";

import { useRouter } from "next/navigation";
import { Sort } from "@/types/memory";

interface SortControlsProps {
  currentSort: Sort;
}

export default function SortControls({ currentSort }: SortControlsProps) {
  const router = useRouter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as Sort;
    router.push(`/?sort=${newSort}`);
  };

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
