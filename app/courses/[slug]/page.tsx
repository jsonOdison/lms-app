"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import CourseDetail from '../../../src/components/CourseDetail';

const courseData = {
  flutter: {
    title: 'Flutter Development',
    description: 'Learn to build beautiful cross-platform apps with Flutter.',
    content: 'Flutter is an open-source UI software development toolkit created by Google. It is used to develop cross-platform applications for Android, iOS, Linux, macOS, Windows, and the web from a single codebase.',
  },
  java: {
    title: 'Java Programming',
    description: 'Master the fundamentals of Java for backend and Android development.',
    content: 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a popular choice for building enterprise-scale applications.',
  },
  nextjs: {
    title: 'Next.js for Beginners',
    description: 'Get started with server-side rendering and static site generation using Next.js.',
    content: 'Next.js is a React framework that enables several extra features, including server-side rendering and generating static websites. It is fast, flexible, and easy to use.',
  },
};

const CourseDetailPage: React.FC = () => {
  const params = useParams();
  const course = courseData[params.slug as keyof typeof courseData];

  if (!course) {
    return <div className="text-center py-20">Course not found.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <CourseDetail
        title={course.title}
        description={course.description}
        content={course.content}
      />
    </div>
  );
};

export default CourseDetailPage;