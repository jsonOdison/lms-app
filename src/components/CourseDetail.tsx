import React from 'react';

interface CourseDetailProps {
  title: string;
  description: string;
  content: string;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ title, description, content }) => {
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-6">{description}</p>
      <div className="text-gray-800">{content}</div>
    </div>
  );
};

export default CourseDetail;