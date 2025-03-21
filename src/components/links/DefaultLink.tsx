import Link from "next/link";

type DefaultLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function DefaultLink({ children, href }: DefaultLinkProps) {
  return (
    <Link
      className="text-black bg-transparent border-2 border-black rounded-md px-4 py-2 flex items-center gap-2"
      href={href}
    >
      {children}
    </Link>
  );
}
