export default function CourseCard({ title, description, link }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={link}>View Course</a>
    </div>
  );
}
