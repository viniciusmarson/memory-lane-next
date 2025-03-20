import "@/styles/globals.css";

import Link from "next/link";
import type { Metadata } from "next";
import { AlertProvider } from "@/contexts/alert";
import { Geist, Geist_Mono } from "next/font/google";
import { CubeIcon } from "@heroicons/react/24/outline";
import SharePageButton from "@/components/ui/buttons/SharePageButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Lane",
  description: "A simple memory app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AlertProvider>
          <main className="flex flex-col md:flex-row min-h-screen w-full">
            <div className="p-4 border-r-2 border-gray-300 hidden md:block">
              <Link href="/">
                <CubeIcon
                  className="h-16 w-16 inline-block"
                  fill="currentColor"
                />
              </Link>
            </div>

            <div className="flex flex-col gap-4 p-4 w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-semibold text-gray-900 mb-4 mt-4">
                  {/* TODO: Get user name when project is authenticated */}
                  User memory lane
                </h1>

                <SharePageButton />
              </div>

              <div className="flex gap-2 border-2 border-gray-300 p-6 rounded-lg">
                <p className="text-gray-500">
                  {/* TODO: Get user description when project is authenticated */}
                  A text explaning the memories defined by the user. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
              </div>

              {children}
            </div>
          </main>
        </AlertProvider>
      </body>
    </html>
  );
}
