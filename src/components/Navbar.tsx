import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">LMS</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <a className="hover:underline">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/courses">
              <a className="hover:underline">Courses</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;