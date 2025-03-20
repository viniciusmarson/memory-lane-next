type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};
