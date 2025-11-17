import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-[#F4E6B0] min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl font-extrabold text-[#1C3142] mb-6 leading-tight">
            Empower Your Team with Growth, Systems, and AI
          </h1>
          <p className="text-xl text-[#6F7A84] mb-8 leading-relaxed">
            Learn essential growth, systems, and AI skills through focused, practical courses built for modern founders and teams.
          </p>
          <Link href="/courses">
            <div className="inline-block px-10 py-4 bg-[#20364A] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-[#3B4F60] transition-all">
              Explore Courses
            </div>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <Image
            src="/landing_logo.svg"
            alt="Landing banner"
            width={500}
            height={250}
            className="h-auto"
          />
        </div>
      </div>
    </main>
  );
}
