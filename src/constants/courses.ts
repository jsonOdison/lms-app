export const COURSE_DATA = {
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

export const courses = [
  {
    title: COURSE_DATA.flutter.title,
    description: COURSE_DATA.flutter.description,
    slug: 'flutter',
  },
  {
    title: COURSE_DATA.java.title,
    description: COURSE_DATA.java.description,
    slug: 'java',
  },
  {
    title: COURSE_DATA.nextjs.title,
    description: COURSE_DATA.nextjs.description,
    slug: 'nextjs',
  },
];