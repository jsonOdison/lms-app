"use client";

import React from "react";
import { useParams } from "next/navigation";
import Chatbot from "@/src/components/Chatbot";
import { COLORS } from "@/src/constants/colors";
import Button from "@/src/components/Button";
import styles from "./CourseDetail.module.css";
import { COURSE_DATA } from "@/src/constants/courses";

// courseData moved to src/constants/courses.ts as COURSE_DATA

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
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.statusRow}>
        <Button
          onClick={handleEnroll}
          disabled={enrolled}
          variant="primary"
          style={{ marginRight: 8 }}
        >
          {enrolled ? 'Enrolled' : 'Enroll Course'}
        </Button>
        {enrolled && (
          <>
            <Button
              onClick={handleResetProgress}
              variant="navy"
              style={{ fontSize: 16 }}
            >
              Reset Progress
            </Button>
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
                  <Button
                    onClick={confirmReset}
                    variant="primary"
                    style={{ marginRight: 16, fontSize: 16 }}
                  >
                    Yes, Reset
                  </Button>
                  <Button
                    onClick={cancelReset}
                    variant="navy"
                    style={{ fontSize: 16 }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        <span className={styles.statusText}>
          Status: {enrolled ? 'Enrolled' : 'Not Enrolled'} | Progress: {progress === 'started' ? 'Course started' : 'Not started'}
        </span>
      </div>
      <div className="mb-10">
        <h2 className={styles.overviewTitle}>Overview</h2>
        <p className={styles.overviewText}>{content.overview}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.topics.map((t: { title: string; points: string[] }, i: number) => (
          <div key={i} className={styles.topicCard}>
            <h3 className={styles.topicTitle}>{t.title}</h3>
            <ul className="list-disc ml-5 space-y-1">
              {t.points.map((p: string, idx: number) => (
                <li key={idx} className={styles.topicPoint}>{p}</li>
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
  const course = COURSE_DATA[(params.slug as keyof typeof COURSE_DATA) ?? ""];

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
