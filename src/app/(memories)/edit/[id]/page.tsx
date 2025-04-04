import { getMemory } from "@/app/actions/memories";
import BackButton from "@/components/ui/buttons/BackButton";
import EditMemoryForm from "@/components/containers/EditMemoryForm";

type EditMemoryProps = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: "Edit memory | Memory Lane",
};

export default async function EditMemory({ params }: EditMemoryProps) {
  const { id } = await params;
  const memory = await getMemory(Number(id));

  if (!memory) {
    return <div>Memory not found</div>;
  }

  return (
    <main className="max-w-lg mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Edit memory</h1>

      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
        role="alert"
      >
        If you want to change the image, you need to delete the current memory
        and create a new one.
      </div>

      <EditMemoryForm memory={memory} />

      <BackButton />
    </main>
  );
}
