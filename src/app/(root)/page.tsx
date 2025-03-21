import { Sort } from "@/types/memory";
import MemoryList from "./components/MemoryList";
import { getMemories } from "@/app/actions/memories";
import { PlusIcon } from "@heroicons/react/24/outline";
import DefaultLink from "@/components/links/DefaultLink";
import { EmptyState } from "@/components/texts/EmptyState";
import SortControls from "@/components/controls/SortControls";
import PaginationControls from "@/components/controls/PaginationControls";

type HomeProps = {
  searchParams: Promise<{ page?: number; limit?: number; sort?: Sort }>;
};

export const generateMetadata = () => {
  return {
    title: "Home | Memory Lane",
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const sort = (params.sort as Sort) || "oldest";

  const { memories, total } = await getMemories(page, limit, sort);

  return (
    <main className="flex flex-col gap-10">
      <div className="flex gap-2 justify-between w-full">
        <SortControls currentSort={sort} />

        <DefaultLink href="/create">
          <PlusIcon className="w-4 h-4" />
          New memory
        </DefaultLink>
      </div>

      {memories.length === 0 && (
        <EmptyState
          title="No memories found"
          description="Start creating memories by clicking the button + New memory above."
        />
      )}

      <MemoryList memories={memories} />

      {memories.length > 0 && (
        <PaginationControls
          total={total}
          currentPage={page}
          currentLimit={limit}
        />
      )}
    </main>
  );
}
