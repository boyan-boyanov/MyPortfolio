import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  vue,
  tailwind,
  nodejs,
  mongodb,
  git,
  furniture,
  academic,
  tax,
  carrent,
  jobit,
  tripguide,
  threejs,
  years20,
  years4,
  education,
  mentoring,
  coordination,
  createGame,
  slider2,
  hanoi1,
  setting,
  winner,
  vueProject,
  zustand,
  angular
} from "../assets";

// Profile links used by the navbar, hero and contact section
export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/boyan-boyanov-dev",
  github: "https://github.com/boyan-boyanov",
  email: "b.i.boianov@gmail.com",
};

// The CV page (/cv) renders this PDF directly. To update the CV, replace the file in public/
// and keep the same name (see README → Updating the CV). URLs are built in src/utils/cv.js
export const cvFile = {
  path: "cv/Boyan_Boyanov_Frontend_Engineer_CV.pdf", // relative to /public
  downloadName: "Boyan_Boyanov_Frontend_Engineer_CV.pdf",
};

// Spread onto links that open an external profile in a new tab
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" };

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "4+ Years",
    subtitle: "Software Engineering",
    icon: years4,
  },
  {
    title: "React + TypeScript",
    subtitle: "Primary frontend stack",
    icon: years20,
  },
  {
    title: "3D & Design",
    subtitle: "Visualization & interactive 3D",
    icon: education,
  },
  {
    title: "Leadership",
    subtitle: "Teams, delivery & mentoring",
    icon: mentoring,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Vue JS",
    icon: vue,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "zustand",
    icon: zustand,
  },
  {
    name: "angular",
    icon: angular,
  },
];

// Timeline entries. `showOnTimeline` (MM/YYYY) decides where the card sits on the timeline:
// work experiences and contributions are merged, sorted by it (newest first) and alternate left / right on wide screens.
// `label` is the small text above the card title (e.g. "Work", "Freelance", "Internship").
// `iconSize` (optional) is the icon size inside the timeline circle: "60%" by default, "100%" fills it,
// above 100% zooms in (e.g. "130%") and everything outside the circle is clipped.
// `details` (optional) fills the "Show more" modal; every part is optional and empty parts are hidden:
//   overview: "text", whatIDid: [...] (work) / responsibilities: [...] (contributions), skills: [...],
//   bringToSoftware: { text: "paragraph", skills: [...] },
//   images: [{ src: importedImage, alt: "..." }] - thumbnails shown before the bullet list,
//     in this order; click one to enlarge it, click again to shrink it
// Without `whatIDid` / `responsibilities` the modal shows the card `points` instead.
const experiences = [
  {
    label: "CAREER FOUNDATION",
    title: "DESIGN & LEADERSHIP",
    company_name: "Furniture Industry",
    icon: furniture,
    iconSize: "129%",
    iconBg: "#383E56",
    date: "2003 - 2022",
    showOnTimeline: "03/2003",
    points: [
      "Built nearly two decades of experience\n" +
      "in 3D design, operations, logistics,\n" +
      "and team leadership."
    ],
    details: {
      overview:
        "Before transitioning into software engineering, I spent nearly two decades working across " +
        "furniture design, 3D visualization, operations management, logistics coordination, and team leadership.",
      whatIDid: [
        "Designed furniture, interiors, and complete residential spaces.",
        "Created photorealistic 3D visualizations and design concepts.",
        "Coordinated projects through the full lifecycle, from concept to installation.",
        "Managed suppliers, logistics, and cross-functional operational processes.",
        "Led teams responsible for logistics, delivery, and installation.",
      ],
      skills: [
        "Leadership",
        "Communication",
        "3D Design",
        "Project Coordination",
        "Logistics",
        "Operations Management",
        "Customer Engagement",
      ],
      bringToSoftware: {
        text:
          "This background continues to influence how I approach software engineering today, " +
          "helping me combine design thinking, stakeholder communication, project planning, " +
          "and team collaboration to build user-focused solutions.",
      },
    },
  },
  {
    label: "DXC Technology ",
    title: "ENTERPRISE REPORTING SOLUTION",
    company_name: "Higher Education Sector",
    icon: academic,
    iconSize: "123%",
    iconBg: "#E6DEDD",
    date: "Sep 2022 - Sep 2023",
    showOnTimeline: "09/2022",
    points: [
      "Enterprise reporting solution built around the Ellucian Banner ecosystem and Argos " +
      "reporting tools.",
    ],
    details: {
      overview:
          "Contributed to an enterprise reporting solution supporting academic and administrative operations within the higher education sector. " +
          "The platform relied on a highly complex enterprise ecosystem built around Ellucian Banner, " +
          "requiring analysis and reporting across large-scale relational datasets and highly interconnected data models.",

      whatIDid: [
        "Collaborated with stakeholders to gather reporting requirements and define report specifications.",
        "Designed and developed SQL-based reports for complex enterprise data structures.",
        "Analyzed relationships between application workflows and highly relational database entities.",
        "Created interactive dashboards and reporting views using Argos reporting tools.",
        "Performed testing and validation to ensure data accuracy, consistency, and reporting reliability.",
      ],

      skills: [
        "SQL",
        "Argos",
        "Ellucian Banner",
        "Data Analysis",
        "Reporting",
        "Dashboard Development",
        "Requirements Analysis",
        "Stakeholder Communication",
        "Enterprise Systems",
        "Complex Data Models"
      ],

      bringToSoftware: {
        text:
            "This project strengthened my ability to analyze complex enterprise systems, work with large-scale relational data models, and translate business requirements into reliable reporting solutions. It also enhanced my stakeholder communication and data-driven problem-solving skills.",
      },
    }
  },
  {
    label: "DXC Technology ",
    title: "PUBLIC SECTOR TAX PLATFORM",
    company_name: "React • TypeScript • Zustand",
    icon: tax,
    iconSize: "115%",
    iconBg: "#383E56",
    date: "Sep 2023 - Oct 2026",
    showOnTimeline: "09/2023",
    points: [
      "Government Digital Services",
      "Large-scale frontend platform supporting " +
      "complex data workflows and validation processes."
    ],
    details: {
      overview:
          "Worked on the frontend development of a large-scale public sector information system designed to manage complex data workflows, validation processes, and long-lived records. " +
          "The platform required high reliability, maintainability, accessibility, and performance while supporting business-critical operations.",

      whatIDid: [
        "Developed reusable React components for large-scale frontend applications.",
        "Built complex forms with extensive validation rules and business logic.",
        "Implemented scalable state management using Zustand.",
        "Integrated React frontends with Java-based backend APIs and complex validation rules.",
        "Performed code reviews to improve code quality, consistency, and maintainability.",
        "Acted as a bridge between frontend, business analysis and QA, identifying incomplete requirements and edge cases before implementation, reducing rework risk.",
      ],

      skills: [
        "React",
        "Zustand",
        "Complex Forms",
        "API Integration",
        "Code Reviews",
        "Accessibility",
        "Requirements Analysis",
        "Agile Development"
      ],

      bringToSoftware: {
        text:
            "This project strengthened my ability to design and maintain large-scale frontend applications, collaborate across technical and business teams, and deliver solutions that balance usability, performance, scalability, and maintainability within complex enterprise environments.",
      },
    }

  },
  {
    label: "DXC Technology",
    title: "HEALTHCARE PLATFORM",
    company_name: "Vue • Pinia • Quasar",
    icon: vueProject,
    iconSize: "120%",
    iconBg: "#E6DEDD",
    date: "Jul 2026 - Present",
    showOnTimeline: "07/2026",
    points: [
      "New frontend built from scratch, with workflows and requirements derived by reverse-engineering a comparable existing system."
    ],
    details: {
      overview:
          "Building a new frontend for a healthcare platform for an EU public sector client. " +
          "Workflows, business rules and requirements are derived by reverse-engineering a comparable existing application, and I own the frontend architecture.",

      whatIDid: [
        "Reverse-engineered a comparable existing application to derive workflows, business rules and requirements for the new frontend.",
        "Defined the frontend architecture and application structure from the ground up.",
        "Implemented dynamic UIs for rule-driven decision flows based on client-provided mockups.",
        "Worked with Business Analysts to turn the reference system's behavior into validated requirements.",
      ],

      skills: [
        "Vue",
        "Pinia",
        "Quasar",
        "Frontend Architecture",
        "Reverse Engineering",
        "Requirements Analysis",
        "System Analysis",
        "Business Logic Analysis"
      ],

      bringToSoftware: {
        text:
            "This project extends my role from feature development to frontend ownership: defining the architecture of a new application and turning the behavior of an existing system into clear, validated requirements.",
      },
    }
  }
];

// Everything done outside the work projects (mentoring, teaching, community, open source...).
// Same structure as `experiences`; merged with them on the timeline (newest first, alternating sides),
// with a smaller card and circle (see components/customStyles/Experience.css).
const contributions = [
  {
    label: "DXC · 🏆1ST PLACE HACKATHON WINNER",
    title: "INTERACTIVE EVENT PLATFORM",
    company_name: "React • Zustand",
    icon: winner,
    iconSize: "118%",
    iconBg: "#E6DEDD",
    date: "Nov 2024",
    showOnTimeline: "06/2023",
    points: [
      "Interactive event platform combining QR-based " +
      "participation, configurable games, and survey-driven " +
      "participant insights.",
    ],
    details: {
      // Order and number of the modal images
      images: [
        { src: createGame, alt: "Configuring a game in the event platform" },
        { src: slider2, alt: "Slider game screen" },
        { src: hanoi1, alt: "Tower of Hanoi game screen" },
        { src: setting, alt: "Settings screen" },
      ],
      overview:
          "Built an interactive event platform during a company hackathon, combining " +
          "configurable games, QR-based onboarding, survey management and participant " +
          "feedback collection to increase engagement. The solution was awarded 1st place.",

      responsibilities: [
        "In a team of 3 (frontend, backend, QA), owned the entire frontend: UI/UX design, architecture and implementation.",
        "Built configurable game, survey, and feedback collection workflows.",
        "Implemented QR-based onboarding and participant tracking.",
      ],

      skills: [
        "React",
        "Zustand",
        "Frontend Architecture",
        "UI/UX Design",
        "Gamification",
        "Rapid Prototyping",
        "Unit Testing",
      ],

      bringToSoftware: {
        text:
            "This project strengthened my ability to rapidly transform ideas into working products, " +
            "design engaging user experiences, and deliver solutions under tight deadlines."
      },
    }
  },
  {
    label: "DXC · INTERNAL INITIATIVE",
    title: "WORKPLACE PARKING PLATFORM",
    company_name: "Power Apps • SharePoint",
    icon: coordination,
    iconSize: "115%",
    iconBg: "#383E56",
    date: "Feb 2024 - Jun 2024",
    showOnTimeline: "04/2023",
    points: [
      "Internal app for reserving the office's limited parking spaces, taken from idea to production.",
    ],
    details: {
      overview:
          "Internal application for reserving the office's limited parking spaces, live in production. " +
          "It began as a learning initiative; I acted as Product Owner, Business Analyst and Scrum Master, and designed the application's UI/UX.",

      responsibilities: [
        "Defined requirements, priorities and delivery scope, and managed the backlog in Jira.",
        "Designed the application's UI/UX.",
        "Coordinated testing and production adoption.",
        "Mentored a Dandelion Program participant throughout the project.",
      ],

      skills: [
        "Product Ownership",
        "Business Analysis",
        "Requirements Gathering",
        "Scrum",
        "UI/UX Design",
        "Jira",
        "Team Leadership",
        "Stakeholder Communication",
        "Quality Assurance",
        "Power Apps",
        "SharePoint",
        "Mentoring",
      ],

      bringToSoftware: {
        text:
            "This project strengthened my ability to bridge business and technical perspectives, " +
            "lead multidisciplinary teams, and guide solutions from idea to successful adoption while supporting " +
            "team growth and knowledge sharing.",
      },
    }
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, contributions, testimonials, projects };