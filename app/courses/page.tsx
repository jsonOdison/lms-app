import React from 'react';
import Link from 'next/link';
import Card from '../../src/components/Card';
import { courses } from '../../src/constants/courses';
import { COLORS } from '../../src/constants/colors';

const CoursesPage: React.FC = () => {
  return (
    <div className="bg-[#D9E8E4] min-h-screen py-10" style={{ backgroundColor: COLORS.secondary.lightBlue }}>
      <h1
        className="text-5xl font-extrabold text-center mb-8 tracking-wide"
        style={{ color: COLORS.primary.darkBlueText }}
      >
        Our Courses
      </h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {courses.map((course) => (
          <Card key={course.slug} title={course.title} description={course.description}>
            <Link href={`/courses/${course.slug}`}>
              <div
                className="mt-4 px-6 py-3 text-center text-lg font-semibold rounded-lg shadow-md cursor-pointer"
                style={{
                  backgroundColor: COLORS.accent.highlightYellow,
                  color: COLORS.primary.navyBlue,
                }}
              >
                View Course
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;