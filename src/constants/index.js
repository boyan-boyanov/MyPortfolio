import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
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
  coordination
} from "../assets";

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
    title: "20+\n" +
        "Years of Design & Leadership",
    icon: years20,
  },
  {
    title: "4+ Years Software Engineering",
    icon: years4,
  },
  {
    title: "Master's Degree\n" + "in Software Engineering\n",
    icon: education,
  },
  {
    title: "3+ Years of\n" +
        "Mentoring &\n" +
        "Teaching",
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
    name: "Redux Toolkit",
    icon: redux,
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
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

// Timeline entries. `showOnTimeline` (MM/YYYY) decides where the card sits on the timeline:
// work experiences and contributions are merged and sorted by it (oldest first).
// `label` is the small text above the card title (e.g. "Work", "Freelance", "Internship").
// `iconSize` (optional) is the icon size inside the timeline circle: "60%" by default, "100%" fills it,
// above 100% zooms in (e.g. "130%") and everything outside the circle is clipped.
// `details` (optional) fills the "Show more" modal; every part is optional and empty parts are hidden:
//   overview: "text", whatIDid: [...], skills: [...],
//   bringToSoftware: { text: "paragraph", skills: [...] },
//   gallery: [{ src: importedImage, alt: "...", caption: "..." }]
// Without `details.whatIDid` the modal shows the card `points` instead.
// Work experiences are shown on the left side of the timeline
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
    label: "Work",
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
    label: "Work",
    title: "PUBLIC SECTOR TAX PLATFORM",
    company_name: "Government Digital Services",
    icon: tax,
    iconSize: "115%",
    iconBg: "#383E56",
    date: "Sep 2023 - Oct 2026",
    showOnTimeline: "09/2023",
    points: [
      "React • TypeScript • Zustand",
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
        "Integrated frontend features with multiple backend APIs and services.",
        "Performed code reviews to improve code quality, consistency, and maintainability.",
        "Collaborated closely with Business Analysts during story refinement and requirements analysis.",
      ],

      skills: [
        "React",
        "JS-Split",
        "Zustand",
        "Frontend Architecture",
        "Complex Forms",
        "API Integration",
        "Code Reviews",
        "Accessibility",
        "Requirements Analysis",
        "Agile Development",
        "Business Process Modeling"
      ],

      bringToSoftware: {
        text:
            "This project strengthened my ability to design and maintain large-scale frontend applications, collaborate across technical and business teams, and deliver solutions that balance usability, performance, scalability, and maintainability within complex enterprise environments.",
      },
    }

  },
  {
    label: "Work",
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    showOnTimeline: "01/2025",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
    details: {
      overview:
          "Contributed to the frontend development of a large-scale public sector information system designed to manage complex data workflows, validation processes, and long-lived records. " +
          "The platform required high reliability, maintainability, accessibility, and performance while supporting business-critical operations.",

      whatIDid: [
        "Developed reusable React components for large-scale frontend applications.",
        "Built complex forms with extensive validation rules and business logic.",
        "Implemented scalable state management using Zustand.",
        "Integrated frontend features with multiple backend APIs and services.",
        "Performed code reviews to improve code quality, consistency, and maintainability.",
        "Collaborated closely with Business Analysts during story refinement and requirements analysis.",
      ],

      skills: [
        "React",
        "TypeScript",
        "Zustand",
        "Frontend Architecture",
        "Complex Forms",
        "API Integration",
        "Code Reviews",
        "Accessibility",
        "Requirements Analysis",
        "Agile Development",
        "Enterprise Applications",
      ],

      bringToSoftware: {
        text:
            "This project strengthened my ability to design and maintain large-scale frontend applications, collaborate across technical and business teams, and deliver solutions that balance usability, performance, scalability, and maintainability within complex enterprise environments.",
      },
    }

  },
];

// Everything done outside the work projects (mentoring, teaching, community, open source...).
// Same structure as `experiences`; shown on the right side of the timeline.
// TODO: replace these placeholder entries with real contributions
const contributions = [
  {
    label: "LEADERSHIP",
    title: "WORKPLACE PARKING PLATFORM",
    company_name: "Product Ownership & Delivery",
    icon: coordination,
    iconSize: "115%",
    iconBg: "#383E56",
    date: "Jan 2024 - Jun 2024",
    showOnTimeline: "01/2024",
    points: [
      "Product ownership and roadmap definition.",
      "Business analysis and requirements gathering.",
      "Delivery coordination, testing, and quality assurance.",
      "Mentoring and team support throughout development.",
    ],
    details: {
      overview:
          "Led the delivery of an internal parking reservation platform that began as a learning initiative and evolved into a production-ready solution actively used within the organization.",

      myResponsibilities: [
        "Defined requirements, priorities, and product vision as Product Owner.",
        "Performed business analysis and translated business needs into functional requirements.",
        "Facilitated team collaboration and delivery activities.",
        "Coordinated testing and quality assurance efforts.",
        "Contributed to solution design and implementation using Microsoft Power Platform technologies.",
      ],

      leadershipImpact: [
        "Provided end-to-end ownership throughout the project lifecycle.",
        "Mentored a participant from the Dandelion program during delivery.",
        "Helped establish structured workflows and collaboration practices.",
        "Supported the transition from learning initiative to production adoption.",
      ],

      skills: [
        "Product Ownership",
        "Business Analysis",
        "Requirements Gathering",
        "Scrum",
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
  {
    label: "Contribution",
    title: "Technical Trainer",
    company_name: "Organization name",
    icon: education,
    iconBg: "#E6DEDD",
    date: "Sep 2022 - Present",
    showOnTimeline: "09/2022",
    points: [
      "Describe the courses or workshops here.",
      "Add the number of students or topics here.",
    ],
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