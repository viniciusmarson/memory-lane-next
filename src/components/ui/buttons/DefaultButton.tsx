type DefaultButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function DefaultButton({
  children,
  onClick,
}: DefaultButtonProps) {
  return (
    <button
      className="text-black bg-transparent px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
