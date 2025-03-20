import "@/styles/globals.css";

import Link from "next/link";
import type { Metadata } from "next";
import { AlertProvider } from "@/contexts/alert";
import { CubeIcon } from "@heroicons/react/20/solid";
import { Geist, Geist_Mono } from "next/font/google";
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
                <CubeIcon className="h-16 w-16 inline-block" />
              </Link>
            </div>

            <div className="flex flex-col gap-8 p-4 w-full">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-4xl font-semibold text-gray-900 mb-4 mt-4">
                    {/* TODO: Get user name when project is authenticated */}
                    Memory lane
                  </h1>
                  <p className="text-gray-500">
                    {/* TODO: Get user description when project is authenticated */}
                    The best memories of your life get better when shared with
                    others.
                  </p>
                </div>

                <SharePageButton />
              </div>

              {children}
            </div>
          </main>
        </AlertProvider>
      </body>
    </html>
  );
}
