export type TaskData = {
  taskNumber: number;
  title: string;
  description: string;
  features: string[];
  outcome: string;
};

export type DomainTasks = {
  slug: string;
  name: string;
  icon: string;
  color: string;
  tasks: TaskData[];
};

export const ALL_DOMAINS_TASKS: DomainTasks[] = [
  {
    slug: "fullstack",
    name: "Full Stack Development",
    icon: "FS",
    color: "from-fuchsia-500 to-purple-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Personal Portfolio Website",
        description:
          "Build a responsive portfolio website showcasing your projects, skills, and experience as a developer.",
        features: ["React frontend", "Node.js backend", "Contact form", "Responsive UI"],
        outcome: "Create a professional online presence and learn full-stack deployment workflows.",
      },
      {
        taskNumber: 2,
        title: "Task Management App",
        description:
          "Build a CRUD task manager with user authentication and real-time status tracking.",
        features: [
          "User login/signup",
          "Create/Edit/Delete tasks",
          "Status tracking",
          "MongoDB database",
        ],
        outcome: "Master CRUD operations and database integration in full-stack applications.",
      },
      {
        taskNumber: 3,
        title: "E-Commerce Website",
        description:
          "Create an online shopping website with product management and order processing.",
        features: ["Product listing", "Cart system", "Order management", "Admin panel"],
        outcome: "Build production-ready e-commerce features including payment flow and inventory.",
      },
      {
        taskNumber: 4,
        title: "Social Media Dashboard",
        description: "Build a mini social platform with posts, comments, likes, and user profiles.",
        features: ["Posts & comments", "User profiles", "Likes system", "REST APIs"],
        outcome: "Design and implement social media features with RESTful API architecture.",
      },
      {
        taskNumber: 5,
        title: "Internship Management Portal",
        description:
          "Build an internship portal with student registration, task submissions, and certificate generation.",
        features: ["Student registration", "Task submissions", "Certificates", "Admin dashboard"],
        outcome: "Develop a complete portal system with role-based access and automated workflows.",
      },
    ],
  },
  {
    slug: "frontend",
    name: "Frontend Development",
    icon: "FE",
    color: "from-pink-500 to-rose-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Responsive Landing Page",
        description:
          "Build a pixel-perfect responsive landing page using HTML, Tailwind CSS, and React.",
        features: [
          "Tailwind CSS styling",
          "React components",
          "Mobile-first design",
          "Smooth animations",
        ],
        outcome: "Master responsive design principles and modern CSS frameworks.",
      },
      {
        taskNumber: 2,
        title: "Weather App",
        description:
          "Build a weather application using a public API and React Hooks for state management.",
        features: ["API integration", "React Hooks", "Search functionality", "Dynamic UI updates"],
        outcome: "Learn API consumption and state management with React Hooks.",
      },
      {
        taskNumber: 3,
        title: "Movie Streaming UI",
        description:
          "Create a Netflix-like movie streaming UI with categorized content and search.",
        features: ["Category browsing", "Search & filter", "Responsive grid", "Loading skeletons"],
        outcome:
          "Build complex UI layouts with advanced React patterns and performance optimization.",
      },
      {
        taskNumber: 4,
        title: "Admin Dashboard",
        description:
          "Build a modern admin dashboard with charts, data tables, and dark mode support.",
        features: ["Charts & graphs", "Data tables", "Dark mode toggle", "Sidebar navigation"],
        outcome: "Create data-rich dashboards with visualization libraries and theme switching.",
      },
      {
        taskNumber: 5,
        title: "Chat Application UI",
        description:
          "Build a real-time chat application frontend with messaging UI and online status.",
        features: ["Message bubbles", "Online status", "Typing indicator", "Emoji picker"],
        outcome: "Design real-time communication interfaces with polished UX patterns.",
      },
    ],
  },
  {
    slug: "backend",
    name: "Backend Development",
    icon: "BE",
    color: "from-blue-500 to-indigo-600",
    tasks: [
      {
        taskNumber: 1,
        title: "User Authentication API",
        description:
          "Build a secure JWT-based authentication system with login, register, and protected routes.",
        features: [
          "JWT authentication",
          "Password hashing",
          "Protected routes",
          "Role-based access",
        ],
        outcome:
          "Implement industry-standard authentication patterns with security best practices.",
      },
      {
        taskNumber: 2,
        title: "Blog REST API",
        description:
          "Build a complete RESTful API for a blog platform with CRUD operations using MongoDB.",
        features: ["CRUD operations", "MongoDB integration", "Pagination", "Input validation"],
        outcome: "Design and build scalable REST APIs with proper error handling and validation.",
      },
      {
        taskNumber: 3,
        title: "E-Commerce Backend",
        description:
          "Build a backend system for e-commerce with products, orders, and payment processing.",
        features: [
          "Product management",
          "Order processing",
          "Payment integration",
          "Inventory tracking",
        ],
        outcome:
          "Develop complex backend systems with multiple integrated services and data flows.",
      },
      {
        taskNumber: 4,
        title: "File Upload Service",
        description:
          "Build a file upload service supporting images, documents with validation and cloud storage.",
        features: ["File validation", "Cloud storage", "Thumbnail generation", "Access control"],
        outcome:
          "Handle file operations securely at scale with proper validation and storage strategies.",
      },
      {
        taskNumber: 5,
        title: "URL Shortener API",
        description:
          "Build a URL shortening service with analytics, custom aliases, and expiration tracking.",
        features: ["URL shortening", "Click analytics", "Custom aliases", "Expiration tracking"],
        outcome: "Build efficient caching and redirection systems with analytics capabilities.",
      },
    ],
  },
  {
    slug: "datascience",
    name: "Data Science",
    icon: "DS",
    color: "from-cyan-500 to-blue-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Student Performance Analysis",
        description:
          "Analyze a student marks dataset to identify patterns and insights using Python libraries.",
        features: ["Data cleaning", "Statistical analysis", "Visualization", "Insights report"],
        outcome:
          "Apply exploratory data analysis techniques to extract meaningful insights from raw data.",
      },
      {
        taskNumber: 2,
        title: "Sales Dashboard",
        description:
          "Create an interactive sales dashboard with charts and KPIs using Python and Plotly.",
        features: ["Interactive charts", "KPI metrics", "Time-series analysis", "Export reports"],
        outcome:
          "Build data visualization dashboards that communicate business metrics effectively.",
      },
      {
        taskNumber: 3,
        title: "Customer Segmentation",
        description:
          "Segment customers using K-Means clustering to identify distinct groups for targeted marketing.",
        features: ["K-Means clustering", "Feature engineering", "Elbow method", "Segment profiles"],
        outcome: "Apply unsupervised learning techniques to derive actionable customer segments.",
      },
      {
        taskNumber: 4,
        title: "House Price Prediction",
        description:
          "Build a linear regression model to predict house prices based on multiple features.",
        features: [
          "Linear regression",
          "Feature selection",
          "Model evaluation",
          "Prediction pipeline",
        ],
        outcome:
          "Develop regression models and understand feature importance in predictive analytics.",
      },
      {
        taskNumber: 5,
        title: "Data Visualization Project",
        description:
          "Create a comprehensive interactive dashboard showcasing multiple datasets and visualizations.",
        features: [
          "Multi-page dashboard",
          "Interactive filters",
          "Storytelling",
          "Publication-ready",
        ],
        outcome: "Master data storytelling and build production-quality visualization dashboards.",
      },
    ],
  },
  {
    slug: "aiml",
    name: "AI & Machine Learning",
    icon: "AI",
    color: "from-violet-500 to-purple-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Image Classification",
        description:
          "Classify images using a Convolutional Neural Network (CNN) trained on a standard dataset.",
        features: [
          "CNN architecture",
          "Data augmentation",
          "Model training",
          "Accuracy evaluation",
        ],
        outcome:
          "Understand deep learning fundamentals and build image recognition models from scratch.",
      },
      {
        taskNumber: 2,
        title: "Chatbot",
        description: "Build an intelligent chatbot using NLP techniques and intent classification.",
        features: [
          "Intent recognition",
          "Entity extraction",
          "Conversation flow",
          "Response generation",
        ],
        outcome:
          "Design conversational AI systems with natural language understanding capabilities.",
      },
      {
        taskNumber: 3,
        title: "Sentiment Analysis",
        description:
          "Analyze product reviews and social media text to classify sentiment as positive, negative, or neutral.",
        features: [
          "Text preprocessing",
          "NLP pipeline",
          "Sentiment classification",
          "Visualization",
        ],
        outcome: "Apply NLP techniques to extract sentiment from unstructured text data at scale.",
      },
      {
        taskNumber: 4,
        title: "Resume Screening AI",
        description:
          "Build an AI system that automatically ranks and matches resumes to job descriptions.",
        features: [
          "Text extraction",
          "Similarity scoring",
          "Ranking algorithm",
          "Match visualization",
        ],
        outcome: "Develop intelligent matching algorithms for automated candidate screening.",
      },
      {
        taskNumber: 5,
        title: "Mini GPT / LLM Chatbot",
        description:
          "Build a chatbot powered by transformer models or LLM APIs for advanced conversations.",
        features: ["Transformer model", "Context memory", "Prompt engineering", "API integration"],
        outcome:
          "Work with large language models and understand transformer architecture fundamentals.",
      },
    ],
  },
  {
    slug: "uiux",
    name: "UI / UX Design",
    icon: "UX",
    color: "from-amber-500 to-orange-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Mobile App Design",
        description:
          "Design a complete mobile app UI in Figma with multiple screens and interactive prototypes.",
        features: ["Wireframes", "High-fidelity mockups", "Interactive prototype", "Design system"],
        outcome: "Master mobile UI design patterns and create professional app mockups.",
      },
      {
        taskNumber: 2,
        title: "Website Redesign",
        description:
          "Redesign an existing website with modern UI patterns, improved UX, and better accessibility.",
        features: ["UX audit", "Wireframing", "Visual redesign", "Accessibility improvements"],
        outcome: "Apply UX research methods and redesign thinking to improve existing products.",
      },
      {
        taskNumber: 3,
        title: "Design System",
        description:
          "Create a comprehensive design system with colors, typography, components, and usage guidelines.",
        features: ["Color palette", "Typography scale", "Component library", "Documentation"],
        outcome: "Build scalable design systems that ensure consistency across products.",
      },
      {
        taskNumber: 4,
        title: "Dashboard UI",
        description:
          "Design a modern admin dashboard interface with data visualization and complex navigation.",
        features: ["Dashboard layout", "Data charts", "Navigation patterns", "Dark mode"],
        outcome: "Design complex data-heavy interfaces with intuitive information architecture.",
      },
      {
        taskNumber: 5,
        title: "Case Study",
        description:
          "Complete a full UX case study from research through prototyping and user testing.",
        features: ["User research", "Problem definition", "Solution design", "Usability testing"],
        outcome:
          "Document and present a complete UX design process with professional deliverables.",
      },
    ],
  },
  {
    slug: "python",
    name: "Python Development",
    icon: "Py",
    color: "from-emerald-500 to-teal-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Calculator App",
        description:
          "Build a feature-rich CLI calculator with support for arithmetic operations and history.",
        features: ["CLI interface", "Arithmetic operations", "History tracking", "Error handling"],
        outcome: "Strengthen Python fundamentals and build clean command-line applications.",
      },
      {
        taskNumber: 2,
        title: "Web Scraper",
        description:
          "Build a web scraper using BeautifulSoup to extract and store data from websites.",
        features: ["HTML parsing", "Data extraction", "CSV export", "Rate limiting"],
        outcome: "Learn web scraping techniques and ethical data collection practices.",
      },
      {
        taskNumber: 3,
        title: "Expense Tracker",
        description:
          "Track personal expenses with SQLite database, categories, and spending insights.",
        features: ["SQLite database", "Category management", "Spending reports", "Budget alerts"],
        outcome: "Build database-driven applications with SQL and data analysis capabilities.",
      },
      {
        taskNumber: 4,
        title: "Automation Script",
        description:
          "Create an automation script to organize files, rename batches, and schedule tasks.",
        features: ["File operations", "Batch processing", "Scheduling", "Logging"],
        outcome: "Automate repetitive tasks and build efficient file processing pipelines.",
      },
      {
        taskNumber: 5,
        title: "Flask Web Application",
        description:
          "Build a full CRUD web application using Flask framework with database integration.",
        features: ["Flask routes", "Database ORM", "Form validation", "Template rendering"],
        outcome: "Develop web applications with Python using the Flask micro-framework.",
      },
    ],
  },
  {
    slug: "java",
    name: "Java Development",
    icon: "Jv",
    color: "from-red-500 to-orange-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Student Management System",
        description:
          "Build a student management system using Java with MySQL database connectivity.",
        features: [
          "CRUD operations",
          "MySQL integration",
          "Search functionality",
          "Reports generation",
        ],
        outcome: "Master Java database connectivity and build desktop database applications.",
      },
      {
        taskNumber: 2,
        title: "Banking Application",
        description:
          "Build a banking application demonstrating OOP concepts like inheritance and polymorphism.",
        features: ["Account management", "Transactions", "OOP design", "Exception handling"],
        outcome: "Apply object-oriented programming principles to build real-world applications.",
      },
      {
        taskNumber: 3,
        title: "REST API using Spring Boot",
        description: "Build a complete REST API with Spring Boot, JPA, and PostgreSQL integration.",
        features: ["Spring Boot", "JPA repositories", "REST endpoints", "PostgreSQL database"],
        outcome: "Develop production-ready REST APIs using the Spring Boot framework.",
      },
      {
        taskNumber: 4,
        title: "Library Management System",
        description:
          "Build a library management system with book inventory and member management features.",
        features: [
          "Book catalog",
          "Member management",
          "Issue/Return tracking",
          "Fine calculation",
        ],
        outcome: "Build complete management systems with complex business logic and workflows.",
      },
      {
        taskNumber: 5,
        title: "E-Commerce Backend",
        description: "Build an e-commerce backend using Spring Boot with MySQL and RESTful APIs.",
        features: ["Product APIs", "Cart management", "Order processing", "Spring Security"],
        outcome: "Build enterprise-grade backends with Spring Boot and security integration.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cyber Security",
    icon: "CS",
    color: "from-green-500 to-emerald-600",
    tasks: [
      {
        taskNumber: 1,
        title: "Password Strength Checker",
        description:
          "Build a tool to analyze password strength and provide security improvement suggestions.",
        features: [
          "Strength analysis",
          "Entropy calculation",
          "Common password check",
          "Security tips",
        ],
        outcome:
          "Understand password security principles and implement strength evaluation algorithms.",
      },
      {
        taskNumber: 2,
        title: "Port Scanner",
        description:
          "Build a network port scanner to identify open ports and running services on a target.",
        features: ["Port scanning", "Service detection", "Timeout handling", "Results export"],
        outcome: "Learn network security fundamentals and port scanning techniques.",
      },
      {
        taskNumber: 3,
        title: "Vulnerability Assessment",
        description:
          "Perform basic security testing on web applications using common vulnerability scanners.",
        features: [
          "Vulnerability scanning",
          "Risk assessment",
          "Report generation",
          "Remediation guide",
        ],
        outcome:
          "Identify common web vulnerabilities and understand security assessment methodologies.",
      },
      {
        taskNumber: 4,
        title: "Secure Login System",
        description:
          "Build a login system with JWT authentication, encryption, and security best practices.",
        features: [
          "JWT authentication",
          "Password encryption",
          "Rate limiting",
          "Session management",
        ],
        outcome: "Implement secure authentication systems with modern encryption standards.",
      },
      {
        taskNumber: 5,
        title: "Phishing Detection Tool",
        description:
          "Build a tool to detect suspicious URLs and identify potential phishing attempts.",
        features: ["URL analysis", "Domain checking", "ML classification", "Alert system"],
        outcome: "Develop security tools to detect and prevent phishing attacks.",
      },
    ],
  },
  {
    slug: "digitalmarketing",
    name: "Digital Marketing",
    icon: "DM",
    color: "from-yellow-500 to-amber-600",
    tasks: [
      {
        taskNumber: 1,
        title: "SEO Audit",
        description:
          "Perform a complete SEO audit of a website and provide optimization recommendations.",
        features: ["Site analysis", "Keyword research", "Meta tag audit", "Performance check"],
        outcome: "Master SEO best practices and learn to optimize websites for search engines.",
      },
      {
        taskNumber: 2,
        title: "Social Media Campaign",
        description:
          "Create a comprehensive social media campaign strategy with content calendar and KPIs.",
        features: ["Platform strategy", "Content calendar", "KPI tracking", "Budget planning"],
        outcome: "Design data-driven social media campaigns that drive engagement and conversions.",
      },
      {
        taskNumber: 3,
        title: "Google Ads Campaign",
        description:
          "Plan and set up a Google Ads PPC campaign with keyword targeting and performance tracking.",
        features: [
          "Keyword planning",
          "Ad copywriting",
          "Budget optimization",
          "Conversion tracking",
        ],
        outcome: "Run effective PPC campaigns with optimized budgets and measurable ROI.",
      },
      {
        taskNumber: 4,
        title: "Email Marketing System",
        description: "Create professional email marketing templates and automation workflows.",
        features: ["Email templates", "Automation workflows", "A/B testing", "Analytics tracking"],
        outcome: "Build email marketing systems with automation and performance optimization.",
      },
      {
        taskNumber: 5,
        title: "Analytics Dashboard",
        description:
          "Build a dashboard to track website traffic, user behavior, and marketing conversions.",
        features: ["Traffic tracking", "Conversion funnel", "User behavior", "Custom reports"],
        outcome: "Analyze marketing data and create dashboards that drive data-informed decisions.",
      },
    ],
  },
];

export function getDomainTasks(slug: string): DomainTasks | undefined {
  return ALL_DOMAINS_TASKS.find((d) => d.slug === slug);
}
