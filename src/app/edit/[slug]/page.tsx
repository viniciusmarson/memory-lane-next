import { getMemory } from "@/app/actions";
import BackButton from "@/components/ui/buttons/BackButton";
import EditMemoryForm from "@/components/containers/EditMemoryForm";

type EditMemoryProps = {
  params: { slug: string };
};

export const generateMetadata = () => {
  return {
    title: "Edit memory | Memory Lane",
  };
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
