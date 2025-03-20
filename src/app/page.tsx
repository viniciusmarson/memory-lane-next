import { Sort } from "@/types/memory";
import { getMemories } from "./actions";
import { PlusIcon } from "@heroicons/react/24/outline";
import DefaultLink from "@/components/ui/links/DefaultLink";
import MemoryList from "@/components/containers/MemoryList";
import SortControls from "@/components/ui/controls/SortControls";
import PaginationControls from "@/components/ui/controls/PaginationControls";

type HomeProps = {
  searchParams: { page?: number; limit?: number; sort?: Sort };
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
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-bold">No memories found</h1>
          <p className="text-gray-500">
            Start creating memories by clicking the button{" "}
            <strong>+ New memory</strong> above.
          </p>
        </div>
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
