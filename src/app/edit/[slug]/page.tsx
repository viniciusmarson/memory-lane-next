import { getMemory } from "@/app/actions";
import BackButton from "@/components/ui/buttons/BackButton";
import EditMemoryForm from "@/components/containers/EditMemoryForm";

type EditMemoryProps = {
  params: { slug: string };
};

export default async function EditMemory({ params }: EditMemoryProps) {
  const { slug } = await params;
  const id = parseInt(slug);
  const memory = await getMemory(id);

  if (!memory) {
    return <div>Memory not found</div>;
  }

  return (
    <main className="max-w-lg mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Update Memory</h1>

      <EditMemoryForm memory={memory} />

      <BackButton />
    </main>
  );
}
