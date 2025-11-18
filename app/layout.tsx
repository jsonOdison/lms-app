import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS App",
  description: "Learn growth, systems, and AI with our LMS for founders and teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)]`}
      >
        <div className="min-h-screen flex flex-col">
          
        <header className="bg-[#20364A] text-white py-4">
            <div className="container mx-auto px-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">ElevateHub</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="hover:underline">Home</Link>
                  </li>
                  <li>
                    <Link href="/courses" className="hover:underline">Courses</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          {/* Full-width main area */}
          <main className="grow w-full px-6 py-8">
            {children}
          </main>

          <footer className="bg-[#20364A] text-white py-4 text-center">
            <p>&copy; 2025 LMS App. All rights reserved.</p>
          </footer>

        </div>
      </body>
    </html>
  );
}
