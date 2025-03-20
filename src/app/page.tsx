import Link from "next/link";
import { Sort } from "@/types/memory";
import { getMemories } from "./actions";
import { PlusIcon } from "@heroicons/react/24/outline";
import MemoryList from "@/components/containers/MemoryList";
import SortControls from "@/components/ui/controls/SortControls";
import PaginationControls from "@/components/ui/controls/PaginationControls";

type HomeProps = {
  searchParams: { page?: number; limit?: number; sort?: Sort };
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const sort = (params.sort as Sort) || "oldest";

  const { memories, total } = await getMemories(page, limit, sort);

  return (
    <main className="flex flex-col gap-4 items-center">
      <div className="flex gap-2 justify-between w-full">
        <SortControls currentSort={sort} />

        <Link
          href="/create"
          className="text-black bg-transparent border-2 border-black rounded-md px-4 py-2 flex items-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          New Memory
        </Link>
      </div>

      <MemoryList memories={memories} />

      <PaginationControls
        total={total}
        currentPage={page}
        currentLimit={limit}
      />
    </main>
  );
}
