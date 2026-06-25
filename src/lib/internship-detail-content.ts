import type { Project, Faq } from "./course-detail-content";

export type InternshipDetail = {
  tagline: string;
  longDescription: string;
  responsibilities: string[];
  deliverables: string[];
  toolsAndTechnologies: string[];
  certificateEligibility: string[];
  achievements: string[];
  learningOutcomes: string[];
  realWorldApplications: string[];
  careerOpportunities: string[];
  projects: Project[];
  skills: string[];
  prerequisites: string[];
  benefits: string[];
  faqs: Faq[];
  mentors: { name: string; title: string }[];
  language: string;
  mode: string;
  duration: string;
};

const SHARED_BENEFITS = [
  "Internship completion certificate from Skyrovix",
  "Hands-on experience with real-world projects",
  "Industry-standard tools and workflows",
  "Dedicated mentor guidance and feedback",
  "Offer letter and experience letter",
  "Resume and LinkedIn profile enhancement",
  "Portfolio development with live projects",
  "Placement preparation and career guidance",
];

function detail(
  o: Pick<InternshipDetail, "tagline" | "longDescription" | "projects" | "skills"> & {
    responsibilities?: string[];
    deliverables?: string[];
    toolsAndTechnologies?: string[];
    certificateEligibility?: string[];
    achievements?: string[];
    learningOutcomes?: string[];
    faqs?: Faq[];
    mentors?: { name: string; title: string }[];
    duration?: string;
  },
): InternshipDetail {
  return {
    responsibilities: o.responsibilities ?? [
      "Complete assigned tasks and projects within deadlines",
      "Follow industry best practices and coding standards",
      "Collaborate with mentors and peers through discussions",
      "Document your work and maintain progress reports",
      "Participate in code reviews and feedback sessions",
      "Build and submit portfolio-ready projects",
    ],
    deliverables: o.deliverables ?? [
      "Completed task assignments with source code",
      "Project documentation and README files",
      "Progress reports and weekly updates",
      "Portfolio-ready project submissions",
      "Final presentation or demo recording",
    ],
    toolsAndTechnologies: o.toolsAndTechnologies ?? ["Git & GitHub", "VS Code", "Slack/Discord", "Project Management Tools"],
    certificateEligibility: o.certificateEligibility ?? [
      "Complete all assigned tasks and projects",
      "Maintain at least 80% attendance in sessions",
      "Submit projects before the deadline",
      "Adhere to the internship code of conduct",
    ],
    achievements: o.achievements ?? [
      "Build real-world projects from scratch",
      "Understand industry-standard workflows",
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
    realWorldApplications: [
      "Build production-grade applications",
      "Solve real business problems",
      "Create portfolio-worthy projects",
      "Collaborate using industry-standard tools",
    ],
    careerOpportunities: [
      "Freelance Developer",
      "Junior Developer / Engineer",
      "Full-time roles at startups and enterprises",
      "Open-source contributor",
    ],
    benefits: SHARED_BENEFITS,
    prerequisites: ["Basic computer knowledge", "Internet connection", "Eagerness to learn and build", "No prior experience required"],
    faqs: o.faqs ?? [
      { question: "Is certification provided?", answer: "Yes, you will receive an internship completion certificate along with an experience letter upon successful completion." },
      { question: "Is prior experience required?", answer: "No prior experience is required. The internship is designed to take you from basics to advanced concepts." },
      { question: "How long does the internship last?", answer: "You can choose from 1 to 6 months depending on your availability and learning goals." },
      { question: "Is this a remote internship?", answer: "Yes, the internship is fully remote with flexible timings. You can work from anywhere." },
      { question: "Will I get mentor support?", answer: "Yes, you will be assigned a dedicated mentor who will guide you throughout the internship." },
      { question: "Do I need to pay for the internship?", answer: "The internship is free to start. A nominal certificate fee applies upon completion." },
    ],
    mentors: o.mentors ?? [
      { name: "Hariharan S", title: "Founder & Lead Mentor" },
      { name: "Maheshwaran S", title: "Co-Founder & Technical Mentor" },
    ],
    tagline: o.tagline,
    longDescription: o.longDescription,
    projects: o.projects,
    skills: o.skills,
    language: "English",
    mode: "Remote — Flexible Timings",
    duration: o.duration ?? "1-6 Months",
  };
}

export const INTERNSHIP_DETAILS: Record<string, InternshipDetail> = {
  fullstack: detail({
    tagline: "Build end-to-end web applications with React, Node.js, and databases — the complete full-stack internship.",
    longDescription: "This internship takes you through the entire web development stack. You will build responsive frontends with React, develop robust backends with Node.js and Express, manage databases with MongoDB and PostgreSQL, and deploy applications to production. By the end, you will have built multiple full-stack projects for your portfolio.",
    projects: [
      { title: "Personal Portfolio Website", description: "Full-stack portfolio with blog, admin panel, and contact form.", difficulty: "Beginner" },
      { title: "Task Management App", description: "CRUD task manager with authentication and real-time status updates.", difficulty: "Intermediate" },
      { title: "E-Commerce Website", description: "Complete e-commerce platform with product management and order processing.", difficulty: "Intermediate" },
      { title: "Internship Management Portal", description: "Full portal with student registration, task submissions, and certificates.", difficulty: "Advanced" },
    ],
    skills: ["React", "Node.js", "MongoDB", "PostgreSQL", "Express.js", "REST APIs", "Git", "Docker", "TypeScript", "Tailwind CSS"],
  }),
  frontend: detail({
    tagline: "Create stunning, responsive user interfaces with modern React and Tailwind CSS.",
    longDescription: "Frontend development is about creating beautiful, functional user experiences. This internship covers HTML5, CSS3, JavaScript ES6+, React, state management, responsive design, and modern CSS frameworks. You will build multiple projects that showcase your frontend expertise.",
    projects: [
      { title: "Responsive Landing Page", description: "Pixel-perfect responsive landing page with Tailwind CSS.", difficulty: "Beginner" },
      { title: "Weather App", description: "Real-time weather app using public API with dynamic UI updates.", difficulty: "Intermediate" },
      { title: "Movie Streaming UI", description: "Netflix-like UI with categories, search, and responsive grid.", difficulty: "Intermediate" },
      { title: "Admin Dashboard", description: "Modern dashboard with charts, data tables, and dark mode.", difficulty: "Advanced" },
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript ES6+", "HTML5/CSS3", "Responsive Design", "Git", "REST APIs"],
  }),
  backend: detail({
    tagline: "Power the web with robust APIs, secure databases, and scalable server architecture.",
    longDescription: "Backend development is the engine behind every application. This internship covers Node.js, Express, database design, authentication, API development, and deployment. You will build production-ready backend systems and RESTful APIs.",
    projects: [
      { title: "User Authentication API", description: "Secure JWT-based auth system with login, register, and protected routes.", difficulty: "Beginner" },
      { title: "Blog REST API", description: "Complete RESTful API for a blog platform with CRUD and MongoDB.", difficulty: "Intermediate" },
      { title: "E-Commerce Backend", description: "Backend system for e-commerce with products, orders, and payments.", difficulty: "Advanced" },
      { title: "URL Shortener API", description: "URL shortening service with analytics and custom aliases.", difficulty: "Advanced" },
    ],
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "JWT", "Docker", "Redis", "AWS"],
  }),
  datascience: detail({
    tagline: "Turn raw data into actionable insights — learn data analysis, visualization, and ML.",
    longDescription: "Data science is transforming how businesses make decisions. This internship covers data analysis, visualization, statistics, machine learning, and data storytelling using Python. You will work with real datasets and build a portfolio of data science projects.",
    projects: [
      { title: "Student Performance Analysis", description: "Analyze datasets to identify patterns using Python libraries.", difficulty: "Beginner" },
      { title: "Sales Dashboard", description: "Interactive sales dashboard with charts and KPIs using Plotly.", difficulty: "Intermediate" },
      { title: "Customer Segmentation", description: "K-Means clustering to segment customers for targeted marketing.", difficulty: "Intermediate" },
      { title: "Data Visualization Project", description: "Comprehensive interactive dashboard with multiple datasets.", difficulty: "Advanced" },
    ],
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Scikit-learn", "Jupyter", "SQL", "Statistics", "Tableau"],
  }),
  aiml: detail({
    tagline: "Build intelligent systems — from machine learning algorithms to neural networks and LLMs.",
    longDescription: "AI and machine learning are reshaping every industry. This internship covers ML algorithms, deep learning, NLP, computer vision, and large language models. You will build AI systems that solve real-world problems.",
    projects: [
      { title: "Image Classification", description: "CNN-based image classifier trained on standard datasets.", difficulty: "Intermediate" },
      { title: "Chatbot", description: "Intelligent chatbot with NLP and intent classification.", difficulty: "Intermediate" },
      { title: "Sentiment Analysis", description: "NLP pipeline analyzing sentiment in text data.", difficulty: "Intermediate" },
      { title: "Mini GPT / LLM Chatbot", description: "Chatbot powered by transformer models or LLM APIs.", difficulty: "Advanced" },
    ],
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "LLMs", "MLOps", "RAG"],
  }),
  uiux: detail({
    tagline: "Design delightful digital experiences — master UI/UX with Figma and design thinking.",
    longDescription: "User experience design is at the heart of every successful product. This internship covers design thinking, user research, wireframing, visual design, prototyping, and usability testing. You will create a complete UX portfolio including a full case study.",
    projects: [
      { title: "Mobile App Design", description: "Complete mobile app UI with wireframes, mockups, and prototypes.", difficulty: "Beginner" },
      { title: "Website Redesign", description: "Redesign an existing website with improved UX and modern aesthetics.", difficulty: "Intermediate" },
      { title: "Design System", description: "Comprehensive design system with components and usage guidelines.", difficulty: "Intermediate" },
      { title: "UX Case Study", description: "End-to-end case study from research to final prototype.", difficulty: "Advanced" },
    ],
    skills: ["Figma", "UX Research", "Wireframing", "Prototyping", "Visual Design", "Design Systems", "Usability Testing", "User Personas"],
  }),
  python: detail({
    tagline: "Master Python programming — from fundamentals to automation and web development.",
    longDescription: "Python is one of the most versatile programming languages. This internship covers Python fundamentals, data structures, file handling, web scraping, automation, and Flask web development. You will build real-world Python applications.",
    projects: [
      { title: "Calculator App", description: "Feature-rich CLI calculator with arithmetic operations and history.", difficulty: "Beginner" },
      { title: "Web Scraper", description: "Data extraction tool using BeautifulSoup with CSV export.", difficulty: "Intermediate" },
      { title: "Expense Tracker", description: "Personal expense tracker with SQLite database and spending insights.", difficulty: "Intermediate" },
      { title: "Flask Web Application", description: "Full CRUD web application using Flask with database integration.", difficulty: "Advanced" },
    ],
    skills: ["Python", "Flask", "BeautifulSoup", "SQLite", "REST APIs", "Git", "CLI Tools", "Data Structures"],
  }),
  java: detail({
    tagline: "Build enterprise-grade applications with Java, Spring Boot, and modern tools.",
    longDescription: "Java remains a cornerstone of enterprise software. This internship covers Java fundamentals, OOP, data structures, JDBC, and Spring Boot. You will build real-world applications that follow industry best practices.",
    projects: [
      { title: "Student Management System", description: "CRUD application with MySQL and JDBC connectivity.", difficulty: "Beginner" },
      { title: "Banking Application", description: "OOP-driven banking system with transactions and account management.", difficulty: "Intermediate" },
      { title: "REST API with Spring Boot", description: "Production-ready REST API with JPA and security.", difficulty: "Intermediate" },
      { title: "Library Management System", description: "Complete library system with book inventory and member management.", difficulty: "Advanced" },
    ],
    skills: ["Java", "Spring Boot", "JPA/Hibernate", "MySQL", "REST APIs", "JUnit", "Maven", "Git"],
  }),
  cybersecurity: detail({
    tagline: "Defend systems, hunt vulnerabilities, and master the art of cybersecurity.",
    longDescription: "Cybersecurity is critical for every organization. This internship covers network security, vulnerability assessment, web security, cryptography, and incident response. You will gain hands-on experience with security tools and techniques.",
    projects: [
      { title: "Password Strength Checker", description: "Tool to analyze password strength and suggest improvements.", difficulty: "Beginner" },
      { title: "Port Scanner", description: "Network port scanner with service detection and reporting.", difficulty: "Intermediate" },
      { title: "Secure Login System", description: "JWT authentication system with encryption and security best practices.", difficulty: "Intermediate" },
      { title: "Phishing Detection Tool", description: "ML-powered tool to detect and prevent phishing attempts.", difficulty: "Advanced" },
    ],
    skills: ["Network Security", "Kali Linux", "Wireshark", "OWASP", "Cryptography", "Python", "Ethical Hacking", "Incident Response"],
  }),
  digitalmarketing: detail({
    tagline: "Drive growth with data-driven marketing — SEO, ads, social media, and analytics.",
    longDescription: "Digital marketing drives modern business growth. This internship covers SEO, paid advertising, social media marketing, content strategy, email marketing, and analytics. You will create and optimize campaigns that deliver measurable results.",
    projects: [
      { title: "SEO Audit", description: "Complete SEO audit of a website with optimization recommendations.", difficulty: "Beginner" },
      { title: "Social Media Campaign", description: "Full campaign strategy with content calendar and KPIs.", difficulty: "Intermediate" },
      { title: "Google Ads Campaign", description: "PPC campaign with keyword targeting and budget optimization.", difficulty: "Intermediate" },
      { title: "Analytics Dashboard", description: "Dashboard tracking traffic, conversions, and campaign performance.", difficulty: "Advanced" },
    ],
    skills: ["SEO", "Google Ads", "Social Media Marketing", "Content Marketing", "Email Marketing", "Google Analytics", "PPC", "Copywriting"],
  }),
};
