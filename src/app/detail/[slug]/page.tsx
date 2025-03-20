import Image from "next/image";
import { getMemory } from "../../actions";
import Link from "next/link";

type DetailsPageProps = {
  params: { slug: string };
};

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { slug } = await params;
  const memory = await getMemory(Number(slug));

  if (!memory) {
    return <div>Memory not found</div>;
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        src={memory.image}
        alt={memory.title}
        width={0}
        height={0}
        sizes="(max-width: 800px) 100vw, 800px"
        className="max-w-full h-auto"
      />

      <h1>{memory.title}</h1>
      <p>{memory.description}</p>
      <p>{memory.date}</p>

      <Link
        href={`/edit/${memory.id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Edit
      </Link>

      <Link href="/" className="text-blue-500">
        Back to home
      </Link>
    </div>
  );
}
