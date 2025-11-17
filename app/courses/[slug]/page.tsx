"use client";

import React from "react";
import { useParams } from "next/navigation";
import Chatbot from "@/src/components/Chatbot";
import { COLORS } from "@/src/constants/colors";

const courseData = {
  flutter: {
    title: "Flutter Development",
    description: "Learn to build beautiful cross-platform apps with Flutter.",
    content: {
      overview:
        "Flutter is a UI toolkit for building fast, cross-platform apps with a single codebase. It uses widgets as the core building block for UI.",
      topics: [
        {
          title: "Widgets",
          points: [
            "Everything in Flutter is a widget",
            "Stateless vs Stateful widgets",
            "Widget composition",
            "Custom widgets",
            "InheritedWidget usage",
            "Widget lifecycle"
          ],
        },
        {
          title: "State Management",
          points: [
            "setState fundamentals",
            "Provider basics",
            "App-wide reactive state",
            "Bloc pattern introduction",
            "Riverpod overview",
            "Redux in Flutter"
          ],
        },
        {
          title: "UI Building",
          points: [
            "Material and Cupertino styles",
            "Layout with Row/Column",
            "Working with themes",
            "Animations and transitions",
            "Responsive design",
            "Custom painting"
          ],
        },
      ],
    },
  },

  java: {
    title: "Java Programming",
    description:
      "Master the fundamentals of Java for backend and Android development.",
    content: {
      overview:
        "Java is a robust OOP language used for backend, Android, and enterprise systems.",
      topics: [
        {
          title: "OOP Concepts",
          points: [
            "Classes and Objects",
            "Inheritance",
            "Polymorphism",
            "Encapsulation",
            "Abstraction",
            "Interfaces"
          ],
        },
        {
          title: "Core APIs",
          points: [
            "Collections",
            "Streams",
            "Concurrency basics",
            "Generics",
            "Lambda expressions",
            "File I/O"
          ],
        },
        {
          title: "Backend Work",
          points: [
            "Spring Boot basics",
            "REST controllers",
            "Dependency Injection",
            "JPA and Hibernate",
            "Database connectivity",
            "Unit testing with JUnit"
          ],
        },
      ],
    },
  },

  nextjs: {
    title: "Next.js for Beginners",
    description:
      "Get started with server-side rendering and static site generation using Next.js.",
    content: {
      overview:
        "Next.js is a framework built on top of React adding routing, SSR, SSG, and API routes.",
      topics: [
        {
          title: "Routing",
          points: ["File-based pages", "Dynamic routes", "Nested routes"],
        },
        {
          title: "Rendering",
          points: [
            "SSR vs SSG basics",
            "Client vs Server components",
            "Data fetching",
          ],
        },
        {
          title: "Styling",
          points: ["Tailwind integration", "CSS modules", "Global styles"],
        },
      ],
    },
  },
};

const CourseDetail = ({ title, description, content }: {
  title: string;
  description: string;
  content: {
    overview: string;
    topics: { title: string; points: string[] }[];
  };
}) => {
  const [enrolled, setEnrolled] = React.useState(false);
  const [progress, setProgress] = React.useState<'not started' | 'started'>('not started');
  const [showConfirm, setShowConfirm] = React.useState(false);

  React.useEffect(() => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolled(enrolledCourses.includes(title));
    const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    setProgress(courseProgress[title] || 'not started');
  }, [title]);

  const handleEnroll = () => {
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledCourses.includes(title)) {
      enrolledCourses.push(title);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setEnrolled(true);
      // Start course progress
      const courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
      courseProgress[title] = 'started';
      localStorage.setItem('courseProgress', JSON.stringify(courseProgress));
      setProgress('started');
    }
  };

  const handleResetProgress = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    localStorage.clear();
    setEnrolled(false);
    setProgress('not started');
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 rounded shadow-md"
      style={{
        background: COLORS.secondary.whiteCard,
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
        borderRadius: 16,
        position: 'relative',
      }}
    >
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: COLORS.primary.darkBlueText }}
      >
        {title}
      </h1>
      <p
        className="mb-6"
        style={{ color: COLORS.secondary.greyText, fontSize: 18 }}
      >
        {description}
      </p>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={handleEnroll}
          disabled={enrolled}
          style={{
            background: enrolled ? COLORS.primary.beige : COLORS.accent.highlightYellow,
            color: COLORS.primary.navyBlue,
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontWeight: 600,
            fontSize: 18,
            cursor: enrolled ? 'not-allowed' : 'pointer',
            marginRight: 8,
          }}
        >
          {enrolled ? 'Enrolled' : 'Enroll Course'}
        </button>
        {enrolled && (
          <>
            <button
              onClick={handleResetProgress}
              style={{
                background: COLORS.primary.navyBlue,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
              }}
            >
              Reset Progress
            </button>
            {showConfirm && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0,0,0,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    background: COLORS.secondary.whiteCard,
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                    padding: 32,
                    minWidth: 320,
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 18, marginBottom: 24, color: COLORS.primary.navyBlue }}>
                    Are you sure you want to reset your progress for this course?
                  </p>
                  <button
                    onClick={confirmReset}
                    style={{
                      background: COLORS.accent.highlightYellow,
                      color: COLORS.primary.navyBlue,
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 24px',
                      fontWeight: 600,
                      fontSize: 16,
                      marginRight: 16,
                      cursor: 'pointer',
                    }}
                  >
                    Yes, Reset
                  </button>
                  <button
                    onClick={cancelReset}
                    style={{
                      background: COLORS.primary.navyBlue,
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '10px 24px',
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        <span style={{ fontWeight: 500, color: COLORS.primary.navyBlue }}>
          Status: {enrolled ? 'Enrolled' : 'Not Enrolled'} | Progress: {progress === 'started' ? 'Course started' : 'Not started'}
        </span>
      </div>
      <div className="mb-10">
        <h2
          className="text-2xl font-semibold mb-2"
          style={{ color: COLORS.primary.navyBlue }}
        >
          Overview
        </h2>
        <p className="leading-relaxed" style={{ color: COLORS.primary.darkerBlueText }}>
          {content.overview}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.topics.map((t: { title: string; points: string[] }, i: number) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow-md"
            style={{
              background: COLORS.secondary.lightBlue,
              borderRadius: 12,
              border: `1px solid ${COLORS.primary.beige}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: COLORS.primary.navyBlue }}
            >
              {t.title}
            </h3>
            <ul className="list-disc ml-5 space-y-1">
              {t.points.map((p: string, idx: number) => (
                <li key={idx} style={{ color: COLORS.primary.darkerBlueText, fontSize: 16 }}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Chatbot courseContent={JSON.stringify(content)} />
    </div>
  );
};

const CourseDetailPage = () => {
  const params = useParams();
  const course = courseData[(params.slug as keyof typeof courseData) ?? ""];

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
