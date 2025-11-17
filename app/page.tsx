import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-[#F4E6B0] min-h-screen flex flex-col items-center justify-center">
      <div className="text-center px-6 max-w-4xl">
        <h1 className="text-6xl font-extrabold text-[#1C3142] mb-6 leading-tight">
          Empower Your Team with Growth, Systems, and AI
        </h1>
        <p className="text-xl text-[#6F7A84] mb-8 leading-relaxed">
          Discover the tools and strategies to take your team to the next level. Learn at your own pace with our expertly crafted courses.
        </p>
        <Link href="/courses">
          <div className="inline-block px-10 py-4 bg-[#20364A] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#3B4F60] transition-all">
            Explore Courses
          </div>
        </Link>
      </div>
      <div className="mt-12">
        <Image
          src="/landing_logo.svg"
          alt="Landing illustration"
          width={400}
          height={400}
          className="w-full max-w-md mx-auto"
        />
      </div>
    </main>
  );
}
