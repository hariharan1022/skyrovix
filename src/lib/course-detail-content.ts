export type Project = {
  title: string;
  description: string;
  difficulty: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type CourseDetail = {
  tagline: string;
  longDescription: string;
  achievements: string[];
  realWorldApplications: string[];
  careerOpportunities: string[];
  learningOutcomes: string[];
  projects: Project[];
  skills: string[];
  prerequisites: string[];
  benefits: string[];
  faqs: Faq[];
  instructor: { name: string; title: string };
  language: string;
  mode: string;
  certificate: string;
  updatedAt: string;
};

const SHARED_BENEFITS = [
  "Industry-recognized certificate upon completion",
  "Hands-on projects and real-world assignments",
  "Self-paced learning with lifetime access",
  "Dedicated mentor support and doubt-clearing sessions",
  "Resume and portfolio building guidance",
  "Placement preparation and interview tips",
  "Access to a community of learners and professionals",
  "Progress tracking with quizzes and assessments",
];

const SHARED_PREREQS_BEGINNER = [
  "Basic computer knowledge",
  "Internet connection for online resources",
  "No prior experience required — we start from basics",
  "Eagerness to learn and build projects",
];

function course(
  o: Pick<CourseDetail, "tagline" | "longDescription" | "projects" | "skills"> & {
    prereqs?: string[];
    learningOutcomes?: string[];
    achievements?: string[];
    faqs?: Faq[];
    instructor?: { name: string; title: string };
    language?: string;
    mode?: string;
    certificate?: string;
  },
): CourseDetail {
  return {
    achievements: o.achievements ?? [
      "Build real-world projects from scratch",
      "Understand industry-standard development workflows",
      "Master modern tools and frameworks",
      "Gain hands-on practical experience",
      "Create a professional portfolio",
      "Prepare for interviews and placements",
    ],
    learningOutcomes: o.learningOutcomes ?? [
      "Understand core concepts and best practices",
      "Build complete projects with modern tooling",
      "Write clean, maintainable code",
      "Debug and optimize applications",
      "Deploy and manage production applications",
    ],
    careerOpportunities: [
      "Freelance Developer",
      "Junior Developer / Engineer",
      "Full-time roles at startups and enterprises",
      "Open-source contributor",
    ],
    realWorldApplications: [
      "Build production-grade applications",
      "Solve real business problems",
      "Create portfolio-worthy projects",
      "Collaborate using industry-standard tools",
    ],
    benefits: SHARED_BENEFITS,
    prerequisites: o.prereqs ?? SHARED_PREREQS_BEGINNER,
    faqs: o.faqs ?? [
      { question: "Is certification provided?", answer: "Yes, upon successful completion of the course and passing the final assessment, you will receive an industry-recognized certificate." },
      { question: "Is prior experience required?", answer: "No prior experience is required. The course starts from fundamentals and gradually advances to complex topics." },
      { question: "How long does it take to complete?", answer: "The course is self-paced. On average, learners complete it in 4-8 weeks depending on their schedule." },
      { question: "Can I access it on mobile?", answer: "Yes, the platform is fully responsive and works on mobile, tablet, and desktop." },
      { question: "Will I get mentor support?", answer: "Yes, you will have access to dedicated mentors for doubt-clearing and guidance throughout the course." },
    ],
    instructor: o.instructor ?? { name: "Hariharan S", title: "Founder & Lead Instructor" },
    tagline: o.tagline,
    longDescription: o.longDescription,
    projects: o.projects,
    skills: o.skills,
    language: o.language ?? "English",
    mode: o.mode ?? "Online — Self-Paced",
    certificate: o.certificate ?? "Course Completion Certificate",
    updatedAt: new Date().toISOString().split("T")[0],
  };
}

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  python: course({
    tagline: "Master Python from basics to real-world applications — your first step into coding.",
    longDescription: "Python is one of the most versatile and beginner-friendly programming languages. This course takes you from absolute basics to building real-world applications. You will learn data structures, file handling, web scraping, automation, and web development with Flask. Perfect for aspiring developers, data enthusiasts, and automation engineers.",
    projects: [
      { title: "Expense Tracker", description: "Track personal expenses with categories, budgets, and spending insights.", difficulty: "Beginner" },
      { title: "Web Scraper", description: "Extract and analyze data from websites using BeautifulSoup.", difficulty: "Intermediate" },
      { title: "Flask Blog Application", description: "Build a full-featured blog with user authentication and CRUD operations.", difficulty: "Intermediate" },
      { title: "Automation Toolkit", description: "Create scripts to automate file organization, email sending, and data backup.", difficulty: "Advanced" },
    ],
    skills: ["Python", "Flask", "BeautifulSoup", "SQLite", "REST APIs", "Git", "CLI Tools", "Data Structures"],
  }),
  java: course({
    tagline: "Build enterprise-grade applications with Java — from fundamentals to Spring Boot.",
    longDescription: "Java remains the backbone of enterprise software development. This course covers Java fundamentals, OOP concepts, data structures, database connectivity, and modern Spring Boot development. You will build real-world applications and RESTful APIs that follow industry best practices.",
    projects: [
      { title: "Student Management System", description: "CRUD application with MySQL database connectivity and reporting.", difficulty: "Beginner" },
      { title: "Banking Application", description: "OOP-driven banking system with transactions and account management.", difficulty: "Intermediate" },
      { title: "REST API with Spring Boot", description: "Production-ready REST API with JPA, security, and documentation.", difficulty: "Intermediate" },
      { title: "E-Commerce Backend", description: "Full-featured e-commerce backend with payment integration.", difficulty: "Advanced" },
    ],
    skills: ["Java", "Spring Boot", "JPA/Hibernate", "MySQL", "REST APIs", "JUnit", "Maven", "Git"],
    prereqs: ["Basic understanding of programming concepts", "Computer with internet access", "Familiarity with any programming language helpful"],
  }),
  html: course({
    tagline: "Learn the foundation of the web — HTML5 semantic markup and modern best practices.",
    longDescription: "HTML is the backbone of every website. This course covers modern HTML5 semantic elements, accessibility standards, SEO-friendly markup, forms, multimedia integration, and best practices. You will build complete, well-structured web pages ready for styling with CSS.",
    projects: [
      { title: "Personal Portfolio Page", description: "A complete personal portfolio with sections, navigation, and contact form.", difficulty: "Beginner" },
      { title: "Blog Article Page", description: "Semantically structured blog page with comments section and sidebar.", difficulty: "Beginner" },
      { title: "Event Registration Form", description: "Multi-section registration form with validation and accessibility.", difficulty: "Intermediate" },
      { title: "Business Landing Page", description: "Professional business landing page with multimedia and embedded content.", difficulty: "Intermediate" },
    ],
    skills: ["HTML5", "Semantic Markup", "Web Accessibility", "SEO Basics", "Forms & Validation", "Multimedia Embedding"],
    prereqs: ["Basic computer knowledge", "Internet connection", "No prior coding experience needed"],
  }),
  css: course({
    tagline: "Transform plain HTML into stunning, responsive designs with modern CSS.",
    longDescription: "CSS brings your web pages to life. This course covers everything from basic styling to advanced layouts, animations, responsive design, and CSS frameworks like Tailwind. You will learn to create beautiful, professional-grade user interfaces.",
    projects: [
      { title: "Responsive Landing Page", description: "Fully responsive landing page with mobile-first design.", difficulty: "Beginner" },
      { title: "Admin Dashboard UI", description: "Complex dashboard layout with sidebar, charts, and data tables.", difficulty: "Intermediate" },
      { title: "Portfolio with Animations", description: "Animated portfolio with scroll effects and interactive elements.", difficulty: "Intermediate" },
      { title: "Design System", description: "Complete design system with reusable component classes and documentation.", difficulty: "Advanced" },
    ],
    skills: ["CSS3", "Flexbox", "CSS Grid", "Tailwind CSS", "Responsive Design", "CSS Animations", "SASS/SCSS", "Design Systems"],
  }),
  javascript: course({
    tagline: "Master JavaScript — the language of the web — from basics to modern ES6+.",
    longDescription: "JavaScript powers the modern web. This comprehensive course covers core JavaScript concepts, DOM manipulation, asynchronous programming, ES6+ features, and modern tooling. You will build interactive web applications and understand the foundations of all major JavaScript frameworks.",
    projects: [
      { title: "Interactive To-Do App", description: "Feature-rich todo app with local storage and drag-and-drop.", difficulty: "Beginner" },
      { title: "Weather Dashboard", description: "Real-time weather app using public API with dynamic UI updates.", difficulty: "Intermediate" },
      { title: "Quiz Application", description: "Interactive quiz with timer, scoring, and progress tracking.", difficulty: "Intermediate" },
      { title: "Expense Tracking App", description: "Full CRUD expense tracker with charts and data persistence.", difficulty: "Advanced" },
    ],
    skills: ["JavaScript (ES6+)", "DOM Manipulation", "Async/Await", "Fetch API", "NPM", "Webpack/Vite", "Jest", "Git"],
  }),
  php: course({
    tagline: "Build dynamic server-side applications with PHP — the workhorse of the web.",
    longDescription: "PHP powers millions of websites and remains a critical server-side language. This course covers PHP fundamentals, MySQL integration, OOP in PHP, MVC architecture, and modern frameworks. You will build complete dynamic web applications.",
    projects: [
      { title: "Contact Management System", description: "CRUD contact manager with MySQL database and search.", difficulty: "Beginner" },
      { title: "Blog CMS", description: "Content management system with user authentication and admin panel.", difficulty: "Intermediate" },
      { title: "E-Commerce Store", description: "Online store with product management, cart, and checkout.", difficulty: "Advanced" },
      { title: "Task Management Dashboard", description: "Team task manager with roles, assignments, and status tracking.", difficulty: "Advanced" },
    ],
    skills: ["PHP", "MySQL", "MVC Architecture", "OOP", "Security Best Practices", "REST APIs", "Composer"],
  }),
  sql: course({
    tagline: "Master SQL — query, analyze, and manage data like a professional.",
    longDescription: "SQL is the universal language of databases. This course covers everything from basic queries to advanced database design, optimization, and administration. You will learn to write efficient queries, design normalized databases, and work with multiple database systems including MySQL and PostgreSQL.",
    projects: [
      { title: "Library Database System", description: "Design and implement a complete library management database.", difficulty: "Beginner" },
      { title: "Sales Analytics Dashboard", description: "Complex queries generating business insights from sales data.", difficulty: "Intermediate" },
      { title: "E-Commerce Database", description: "Full e-commerce schema with products, orders, inventory, and users.", difficulty: "Intermediate" },
      { title: "Data Warehouse System", description: "Design a data warehouse with ETL processes and reporting views.", difficulty: "Advanced" },
    ],
    skills: ["SQL", "MySQL/PostgreSQL", "Database Design", "Query Optimization", "Data Modeling", "Stored Procedures", "Indexing"],
  }),
  mysql: course({
    tagline: "Become a MySQL expert — from basic queries to enterprise database administration.",
    longDescription: "MySQL is the world's most popular open-source database. This course provides deep coverage of MySQL-specific features, performance optimization, replication, security, and administration. You will learn to build and manage production-grade MySQL databases.",
    projects: [
      { title: "Employee Management DB", description: "Complete HR database with departments, employees, and payroll.", difficulty: "Beginner" },
      { title: "Inventory System", description: "Inventory tracking database with triggers and automated reports.", difficulty: "Intermediate" },
      { title: "Analytics Data Pipeline", description: "ETL pipeline with scheduled jobs and materialized views.", difficulty: "Advanced" },
      { title: "High-Traffic Web DB", description: "Optimized database design for high-traffic web applications.", difficulty: "Advanced" },
    ],
    skills: ["MySQL", "Query Optimization", "Database Administration", "Replication", "Performance Tuning", "Security", "Backup & Recovery"],
  }),
  django: course({
    tagline: "Build robust, scalable web applications with Django — Python's premier web framework.",
    longDescription: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. This course covers Django fundamentals, ORM, authentication, REST APIs, deployment, and best practices. You will build complete, production-ready web applications.",
    projects: [
      { title: "Blog Platform", description: "Feature-rich blog with categories, comments, and user profiles.", difficulty: "Beginner" },
      { title: "Task Management App", description: "Team task manager with assignments, deadlines, and notifications.", difficulty: "Intermediate" },
      { title: "REST API Backend", description: "Production REST API with full CRUD, auth, and documentation.", difficulty: "Intermediate" },
      { title: "E-Learning Platform", description: "Complete course management system with video uploads and quizzes.", difficulty: "Advanced" },
    ],
    skills: ["Django", "Python", "Django REST Framework", "PostgreSQL", "Authentication", "Docker", "Celery", "Git"],
  }),
  fullstack: course({
    tagline: "Become a full-stack developer — build complete web applications from frontend to backend.",
    longDescription: "Full-stack development is one of the most in-demand skills in the industry. This comprehensive course covers React for frontend, Node.js for backend, database management, authentication, deployment, and DevOps fundamentals. You will build complete, production-ready applications.",
    projects: [
      { title: "Personal Portfolio", description: "Full-stack portfolio with blog, admin panel, and contact form.", difficulty: "Beginner" },
      { title: "E-Commerce Application", description: "Complete e-commerce platform with payments and order management.", difficulty: "Intermediate" },
      { title: "Social Media Dashboard", description: "Social platform with profiles, posts, likes, and real-time updates.", difficulty: "Intermediate" },
      { title: "Project Management Tool", description: "Trello-like tool with drag-drop, teams, and notifications.", difficulty: "Advanced" },
    ],
    skills: ["React", "Node.js", "MongoDB", "PostgreSQL", "Express.js", "Docker", "Git", "REST APIs", "TypeScript", "AWS"],
    prereqs: ["Basic programming knowledge", "Familiarity with HTML/CSS/JavaScript", "Computer with internet access"],
  }),
  frontend: course({
    tagline: "Master modern frontend development — React, Tailwind, and the latest web technologies.",
    longDescription: "Frontend development is the most visible part of web applications. This course covers modern frontend technologies including React, TypeScript, Tailwind CSS, state management, and testing. You will build beautiful, responsive, and performant user interfaces.",
    projects: [
      { title: "Responsive Portfolio", description: "Modern portfolio with dark mode and smooth animations.", difficulty: "Beginner" },
      { title: "Dashboard Application", description: "Admin dashboard with charts, tables, and interactive widgets.", difficulty: "Intermediate" },
      { title: "Movie Discovery App", description: "TMDB-powered app with search, filters, and favorites.", difficulty: "Intermediate" },
      { title: "Real-Time Chat UI", description: "Beautiful chat interface with typing indicators and themes.", difficulty: "Advanced" },
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript ES6+", "HTML5/CSS3", "Vitest", "Vite", "Git"],
  }),
  backend: course({
    tagline: "Build powerful, scalable server-side systems — APIs, databases, and cloud services.",
    longDescription: "Backend development powers the logic and data behind every application. This course covers Node.js, Express, database design, authentication, API development, and cloud deployment. You will build production-ready backend systems.",
    projects: [
      { title: "REST API Service", description: "Complete REST API with authentication, CRUD, and documentation.", difficulty: "Beginner" },
      { title: "Real-Time Notification System", description: "WebSocket-based notification service with event-driven architecture.", difficulty: "Intermediate" },
      { title: "E-Commerce Backend", description: "Full backend for e-commerce with payments, inventory, and orders.", difficulty: "Intermediate" },
      { title: "Microservices Architecture", description: "Distributed system with multiple services and message queues.", difficulty: "Advanced" },
    ],
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "WebSocket", "Docker", "AWS", "Redis"],
  }),
  datascience: course({
    tagline: "Turn raw data into actionable insights — learn data science from scratch.",
    longDescription: "Data science is one of the fastest-growing fields. This course covers data analysis, visualization, statistics, machine learning, and data storytelling using Python. You will work with real datasets and build a portfolio of data science projects.",
    projects: [
      { title: "Exploratory Data Analysis", description: "Analyze real-world datasets and extract meaningful insights.", difficulty: "Beginner" },
      { title: "Sales Dashboard", description: "Interactive dashboard visualizing sales trends and KPIs.", difficulty: "Intermediate" },
      { title: "Customer Segmentation", description: "K-Means clustering to segment customers for targeted marketing.", difficulty: "Intermediate" },
      { title: "Predictive Analytics Model", description: "Build and deploy a machine learning model for prediction.", difficulty: "Advanced" },
    ],
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Jupyter", "SQL", "Statistics"],
  }),
  aiml: course({
    tagline: "Dive into AI and machine learning — from algorithms to neural networks and LLMs.",
    longDescription: "Artificial intelligence is transforming every industry. This course covers machine learning algorithms, deep learning, natural language processing, computer vision, and large language models. You will build intelligent systems that solve real problems.",
    projects: [
      { title: "Image Classifier", description: "CNN-based image classification on real-world datasets.", difficulty: "Beginner" },
      { title: "Sentiment Analyzer", description: "NLP pipeline analyzing sentiment in product reviews.", difficulty: "Intermediate" },
      { title: "AI Chatbot", description: "Conversational AI with intent recognition and context memory.", difficulty: "Intermediate" },
      { title: "Resume Screening AI", description: "ML system that ranks and matches resumes to job descriptions.", difficulty: "Advanced" },
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "LLMs", "MLOps"],
    prereqs: ["Basic Python knowledge", "High school mathematics", "Computer with internet access"],
  }),
  uiux: course({
    tagline: "Design delightful digital experiences — master UI/UX design from research to prototyping.",
    longDescription: "User experience design is critical to product success. This course covers design thinking, user research, wireframing, visual design, prototyping, and usability testing using Figma. You will create a complete UX case study for your portfolio.",
    projects: [
      { title: "Mobile App Design", description: "Complete mobile app UI with wireframes, mockups, and prototypes.", difficulty: "Beginner" },
      { title: "Website Redesign", description: "Redesign an existing website with improved UX and modern UI.", difficulty: "Intermediate" },
      { title: "Design System", description: "Comprehensive design system with components and usage guidelines.", difficulty: "Intermediate" },
      { title: "UX Case Study", description: "End-to-end case study from research to final prototype.", difficulty: "Advanced" },
    ],
    skills: ["Figma", "UX Research", "Wireframing", "Prototyping", "Visual Design", "Design Systems", "Usability Testing", "User Personas"],
  }),
  cybersecurity: course({
    tagline: "Defend the digital world — learn ethical hacking, security analysis, and risk management.",
    longDescription: "Cybersecurity is one of the most critical fields in technology. This course covers network security, vulnerability assessment, cryptography, secure coding, and incident response. You will gain hands-on experience with security tools and techniques.",
    projects: [
      { title: "Password Strength Analyzer", description: "Tool to evaluate password strength and suggest improvements.", difficulty: "Beginner" },
      { title: "Network Port Scanner", description: "Port scanning tool with service detection and reporting.", difficulty: "Intermediate" },
      { title: "Secure Login System", description: "Authentication system with JWT, encryption, and rate limiting.", difficulty: "Intermediate" },
      { title: "Phishing Detection Tool", description: "ML-powered tool to detect and flag phishing attempts.", difficulty: "Advanced" },
    ],
    skills: ["Network Security", "Kali Linux", "Wireshark", "OWASP", "Cryptography", "Python", "Incident Response", "Ethical Hacking"],
  }),
  digitalmarketing: course({
    tagline: "Master digital marketing — SEO, ads, social media, and data-driven growth strategies.",
    longDescription: "Digital marketing is essential for every modern business. This course covers SEO, paid advertising, social media marketing, content strategy, email marketing, and analytics. You will learn to create and optimize marketing campaigns that deliver measurable results.",
    projects: [
      { title: "SEO Audit Report", description: "Complete SEO audit of a website with optimization recommendations.", difficulty: "Beginner" },
      { title: "Social Media Campaign", description: "Full campaign strategy with content calendar and KPI tracking.", difficulty: "Intermediate" },
      { title: "Google Ads Campaign", description: "PPC campaign setup with keyword targeting and optimization.", difficulty: "Intermediate" },
      { title: "Marketing Analytics Dashboard", description: "Dashboard tracking traffic, conversions, and campaign performance.", difficulty: "Advanced" },
    ],
    skills: ["SEO", "Google Ads", "Social Media Marketing", "Content Marketing", "Email Marketing", "Google Analytics", "PPC", "Copywriting"],
  }),
};
