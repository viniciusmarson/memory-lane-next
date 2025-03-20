import Link from "next/link";
import CreateMemoryForm from "@/components/containers/CreateMemoryForm";

export default async function Home() {
  return (
    <main className="max-w-lg mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Create Memory</h1>

      <CreateMemoryForm />

      <Link href="/" className="text-blue-500 mb-4">
        Back to Memories
      </Link>
    </main>
  );
}
