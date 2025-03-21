import Image from "next/image";
import { getMemory } from "../../actions";
import Link from "next/link";

type DetailsPageProps = {
  params: { id: string };
};

export const generateMetadata = () => {
  return {
    title: `Memory details | Memory Lane`,
  };
};

// TODO: Implement a better design for the details page
export default async function DetailsPage({ params }: DetailsPageProps) {
  const { id } = await params;
  const memory = await getMemory(Number(id));

  if (!memory) {
    return <div>Memory not found</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-center">
          <Image
            src={memory.image}
            width={0} // auto width
            height={0} // auto height
            sizes="auto"
            alt={memory.title}
            className="object-contain w-auto h-auto"
          />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">{memory.title}</h1>
          <p className="text-gray-500">{memory.description}</p>
          <p className="text-gray-500">{memory.date}</p>
        </div>

        <Link
          href={`/edit/${memory.id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-center w-30"
        >
          Edit
        </Link>

        <Link href="/" className="text-blue-500">
          Back to home
        </Link>
      </div>
    </div>
  );
}
