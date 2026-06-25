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

const ALL_DOMAINS_TASKS: DomainTasks[] = [
  {
    slug: "fullstack",
    name: "Full Stack Development",
    icon: "FS",
    color: "from-fuchsia-500 to-[#07284a]",
    tasks: [
      { taskNumber: 1, title: "Personal Portfolio Website", description: "Build a responsive portfolio website showcasing your projects, skills, and experience as a developer.", features: ["React frontend", "Node.js backend", "Contact form", "Responsive UI"], outcome: "Create a professional online presence and learn full-stack deployment workflows." },
      { taskNumber: 2, title: "Task Management App", description: "Build a CRUD task manager with user authentication and real-time status tracking.", features: ["User login/signup", "Create/Edit/Delete tasks", "Status tracking", "MongoDB database"], outcome: "Master CRUD operations and database integration in full-stack applications." },
      { taskNumber: 3, title: "E-Commerce Website", description: "Create an online shopping website with product management and order processing.", features: ["Product listing", "Cart system", "Order management", "Admin panel"], outcome: "Build production-ready e-commerce features including payment flow and inventory." },
      { taskNumber: 4, title: "Social Media Dashboard", description: "Build a mini social platform with posts, comments, likes, and user profiles.", features: ["Posts & comments", "User profiles", "Likes system", "REST APIs"], outcome: "Design and implement social media features with RESTful API architecture." },
      { taskNumber: 5, title: "Internship Management Portal", description: "Build an internship portal with student registration, task submissions, and certificate generation.", features: ["Student registration", "Task submissions", "Certificates", "Admin dashboard"], outcome: "Develop a complete portal system with role-based access and automated workflows." },
      { taskNumber: 6, title: "Real-Time Chat Application", description: "Build a real-time messaging app using WebSockets with room-based chat and online presence.", features: ["Socket.io integration", "Room-based chat", "Online presence", "Message history"], outcome: "Implement real-time communication features using WebSocket protocols." },
      { taskNumber: 7, title: "CI/CD Pipeline & Deployment", description: "Set up Docker containers, CI/CD with GitHub Actions, and deploy to cloud.", features: ["Docker containerization", "GitHub Actions CI/CD", "Cloud deployment", "Environment configs"], outcome: "Automate deployment pipelines and containerize applications for production." },
      { taskNumber: 8, title: "Microservices Architecture", description: "Decompose the monolith into microservices with API gateway and service discovery.", features: ["Service decomposition", "API Gateway", "Service discovery", "Inter-service communication"], outcome: "Design and implement microservices architecture with proper service boundaries." },
      { taskNumber: 9, title: "Performance Optimization", description: "Optimize application performance with caching, CDN, lazy loading, and database indexing.", features: ["Redis caching", "CDN integration", "Lazy loading", "Query optimization"], outcome: "Apply performance optimization techniques to achieve sub-second response times." },
      { taskNumber: 10, title: "Testing Suite", description: "Write comprehensive unit, integration, and end-to-end tests for the entire application.", features: ["Unit tests (Jest)", "Integration tests", "E2E tests (Cypress)", "Test coverage reports"], outcome: "Build robust test suites ensuring application reliability and code quality." },
      { taskNumber: 11, title: "Multi-Tenant SaaS Platform", description: "Build a complete multi-tenant SaaS platform with billing, analytics, and team management.", features: ["Tenant isolation", "Subscription billing", "Usage analytics", "Team management"], outcome: "Architect and develop a production-grade SaaS platform from scratch." },
      { taskNumber: 12, title: "Production Deployment & Documentation", description: "Deploy to Kubernetes, set up monitoring, create API docs, and prepare handover documentation.", features: ["Kubernetes deployment", "Prometheus/Grafana", "Swagger/OpenAPI docs", "System architecture docs"], outcome: "Deliver a production-ready application with complete monitoring and documentation." },
    ],
  },
  {
    slug: "frontend",
    name: "Frontend Development",
    icon: "FE",
    color: "from-pink-500 to-rose-600",
    tasks: [
      { taskNumber: 1, title: "Responsive Landing Page", description: "Build a pixel-perfect responsive landing page using HTML, Tailwind CSS, and React.", features: ["Tailwind CSS styling", "React components", "Mobile-first design", "Smooth animations"], outcome: "Master responsive design principles and modern CSS frameworks." },
      { taskNumber: 2, title: "Weather App", description: "Build a weather application using a public API and React Hooks for state management.", features: ["API integration", "React Hooks", "Search functionality", "Dynamic UI updates"], outcome: "Learn API consumption and state management with React Hooks." },
      { taskNumber: 3, title: "Movie Streaming UI", description: "Create a Netflix-like movie streaming UI with categorized content and search.", features: ["Category browsing", "Search & filter", "Responsive grid", "Loading skeletons"], outcome: "Build complex UI layouts with advanced React patterns and performance optimization." },
      { taskNumber: 4, title: "Admin Dashboard", description: "Build a modern admin dashboard with charts, data tables, and dark mode support.", features: ["Charts & graphs", "Data tables", "Dark mode toggle", "Sidebar navigation"], outcome: "Create data-rich dashboards with visualization libraries and theme switching." },
      { taskNumber: 5, title: "Chat Application UI", description: "Build a real-time chat application frontend with messaging UI and online status.", features: ["Message bubbles", "Online status", "Typing indicator", "Emoji picker"], outcome: "Design real-time communication interfaces with polished UX patterns." },
      { taskNumber: 6, title: "State Management with Zustand", description: "Migrate application state to Zustand for global state management with persistence.", features: ["Zustand store setup", "Persistence middleware", "DevTools integration", "Store slices"], outcome: "Implement efficient state management patterns for large-scale React applications." },
      { taskNumber: 7, title: "Advanced Animations", description: "Add Framer Motion animations including page transitions, gestures, and layout animations.", features: ["Page transitions", "Gesture animations", "Layout animations", "Scroll-triggered effects"], outcome: "Create fluid, polished user experiences with production-grade animations." },
      { taskNumber: 8, title: "Progressive Web App", description: "Convert the app into a PWA with service workers, offline support, and install prompts.", features: ["Service worker registration", "Offline caching", "Install prompt", "Push notifications"], outcome: "Build installable web apps with offline-first architecture and native-like experience." },
      { taskNumber: 9, title: "Component Library & Storybook", description: "Extract reusable components into a library documented with Storybook.", features: ["Component extraction", "Storybook stories", "Visual regression tests", "Design tokens"], outcome: "Build and maintain scalable component libraries with living documentation." },
      { taskNumber: 10, title: "Performance & Testing", description: "Run Lighthouse audits, optimize Core Web Vitals, and write comprehensive frontend tests.", features: ["Lighthouse optimization", "Core Web Vitals", "Jest + React Testing Library", "Cypress E2E"], outcome: "Achieve 90+ Lighthouse scores with thoroughly tested frontend code." },
      { taskNumber: 11, title: "Enterprise Application", description: "Build a full-featured enterprise dashboard with role-based views, real-time data, and complex workflows.", features: ["Role-based views", "Real-time data streams", "Complex forms/validation", "Export & reporting"], outcome: "Architect and build complex enterprise-grade frontend applications." },
      { taskNumber: 12, title: "Documentation & Deployment", description: "Deploy to Vercel, set up CI/CD, document components, and create a project wiki.", features: ["Vercel deployment", "GitHub Actions CI", "Storybook hosting", "Project documentation"], outcome: "Deliver a production-grade frontend with automated CI/CD and comprehensive docs." },
    ],
  },
  {
    slug: "backend",
    name: "Backend Development",
    icon: "BE",
    color: "from-blue-500 to-indigo-600",
    tasks: [
      { taskNumber: 1, title: "User Authentication API", description: "Build a secure JWT-based authentication system with login, register, and protected routes.", features: ["JWT authentication", "Password hashing", "Protected routes", "Role-based access"], outcome: "Implement industry-standard authentication patterns with security best practices." },
      { taskNumber: 2, title: "Blog REST API", description: "Build a complete RESTful API for a blog platform with CRUD operations using MongoDB.", features: ["CRUD operations", "MongoDB integration", "Pagination", "Input validation"], outcome: "Design and build scalable REST APIs with proper error handling and validation." },
      { taskNumber: 3, title: "E-Commerce Backend", description: "Build a backend system for e-commerce with products, orders, and payment processing.", features: ["Product management", "Order processing", "Payment integration", "Inventory tracking"], outcome: "Develop complex backend systems with multiple integrated services and data flows." },
      { taskNumber: 4, title: "File Upload Service", description: "Build a file upload service supporting images, documents with validation and cloud storage.", features: ["File validation", "Cloud storage", "Thumbnail generation", "Access control"], outcome: "Handle file operations securely at scale with proper validation and storage strategies." },
      { taskNumber: 5, title: "URL Shortener API", description: "Build a URL shortening service with analytics, custom aliases, and expiration tracking.", features: ["URL shortening", "Click analytics", "Custom aliases", "Expiration tracking"], outcome: "Build efficient caching and redirection systems with analytics capabilities." },
      { taskNumber: 6, title: "Real-Time Notification Service", description: "Implement WebSocket-based real-time notifications and event-driven messaging.", features: ["WebSocket server", "Event emitters", "Notification channels", "Broadcast system"], outcome: "Design and implement real-time communication using event-driven architecture." },
      { taskNumber: 7, title: "Docker & Containerization", description: "Containerize all backend services with Docker Compose for local and production environments.", features: ["Dockerfiles", "Docker Compose", "Multi-stage builds", "Environment variables"], outcome: "Containerize backend applications for consistent development and deployment." },
      { taskNumber: 8, title: "API Gateway & Rate Limiting", description: "Build an API gateway with rate limiting, request throttling, and route aggregation.", features: ["API Gateway", "Rate limiting", "Request throttling", "Route aggregation"], outcome: "Implement API gateway patterns for managing, securing, and scaling microservices." },
      { taskNumber: 9, title: "Database Optimization & Caching", description: "Optimize database queries, implement Redis caching, and set up read replicas.", features: ["Query optimization", "Redis caching", "Connection pooling", "Read replicas"], outcome: "Design high-performance database architectures with caching layers and optimization." },
      { taskNumber: 10, title: "GraphQL API", description: "Build a GraphQL API layer with Apollo Server, resolvers, and data loaders.", features: ["GraphQL schema", "Resolvers", "Data loaders", "Subscriptions"], outcome: "Build efficient GraphQL APIs with proper data fetching and batching strategies." },
      { taskNumber: 11, title: "Enterprise Microservices", description: "Design and implement a full microservices ecosystem with service mesh, event bus, and distributed tracing.", features: ["Service mesh", "Event bus (Kafka)", "Distributed tracing", "Health checks"], outcome: "Architect enterprise-grade microservices with observability and resilience." },
      { taskNumber: 12, title: "Monitoring & Documentation", description: "Set up Prometheus/Grafana monitoring, centralized logging, and API documentation.", features: ["Prometheus metrics", "Grafana dashboards", "ELK logging", "OpenAPI/Swagger"], outcome: "Deliver production-ready backend with complete observability and documentation." },
    ],
  },
  {
    slug: "datascience",
    name: "Data Science",
    icon: "DS",
    color: "from-cyan-500 to-blue-600",
    tasks: [
      { taskNumber: 1, title: "Student Performance Analysis", description: "Analyze a student marks dataset to identify patterns and insights using Python libraries.", features: ["Data cleaning", "Statistical analysis", "Visualization", "Insights report"], outcome: "Apply exploratory data analysis techniques to extract meaningful insights from raw data." },
      { taskNumber: 2, title: "Sales Dashboard", description: "Create an interactive sales dashboard with charts and KPIs using Python and Plotly.", features: ["Interactive charts", "KPI metrics", "Time-series analysis", "Export reports"], outcome: "Build data visualization dashboards that communicate business metrics effectively." },
      { taskNumber: 3, title: "Customer Segmentation", description: "Segment customers using K-Means clustering to identify distinct groups for targeted marketing.", features: ["K-Means clustering", "Feature engineering", "Elbow method", "Segment profiles"], outcome: "Apply unsupervised learning techniques to derive actionable customer segments." },
      { taskNumber: 4, title: "House Price Prediction", description: "Build a linear regression model to predict house prices based on multiple features.", features: ["Linear regression", "Feature selection", "Model evaluation", "Prediction pipeline"], outcome: "Develop regression models and understand feature importance in predictive analytics." },
      { taskNumber: 5, title: "Data Visualization Project", description: "Create a comprehensive interactive dashboard showcasing multiple datasets and visualizations.", features: ["Multi-page dashboard", "Interactive filters", "Storytelling", "Publication-ready"], outcome: "Master data storytelling and build production-quality visualization dashboards." },
      { taskNumber: 6, title: "Time Series Forecasting", description: "Forecast sales or stock prices using ARIMA, Prophet, and moving average models.", features: ["ARIMA modeling", "Prophet forecasting", "Seasonality analysis", "Error metrics"], outcome: "Build accurate time series forecasting models for business planning and analysis." },
      { taskNumber: 7, title: "Recommendation System", description: "Build a collaborative filtering recommendation engine for products or content.", features: ["Collaborative filtering", "Matrix factorization", "Similarity metrics", "Top-N recommendations"], outcome: "Implement recommendation algorithms that power personalized user experiences." },
      { taskNumber: 8, title: "NLP Text Analytics", description: "Process and analyze text data using NLTK and spaCy for insights and entity extraction.", features: ["Text preprocessing", "Entity recognition", "Topic modeling", "Sentiment scoring"], outcome: "Extract structured information from unstructured text using NLP techniques." },
      { taskNumber: 9, title: "Deep Learning Fundamentals", description: "Build neural networks with TensorFlow/Keras for image and text classification tasks.", features: ["Neural network design", "TensorFlow/Keras", "Model training", "Accuracy tuning"], outcome: "Apply deep learning to solve complex classification and prediction problems." },
      { taskNumber: 10, title: "Big Data Processing", description: "Process large datasets using Dask and PySpark with distributed computing techniques.", features: ["Dask DataFrames", "PySpark basics", "Distributed processing", "Performance tuning"], outcome: "Handle large-scale datasets using distributed computing frameworks efficiently." },
      { taskNumber: 11, title: "End-to-End ML Pipeline", description: "Build a complete ML pipeline from data ingestion through model deployment with MLflow.", features: ["MLflow tracking", "Feature store", "Model registry", "Pipeline orchestration"], outcome: "Productionize machine learning workflows with reproducible pipelines and tracking." },
      { taskNumber: 12, title: "Model Deployment & Documentation", description: "Deploy ML models as APIs with FastAPI, containerize with Docker, and document the system.", features: ["FastAPI model serving", "Docker deployment", "API documentation", "Model monitoring"], outcome: "Deliver production ML systems with scalable APIs, monitoring, and documentation." },
    ],
  },
  {
    slug: "aiml",
    name: "AI & Machine Learning",
    icon: "AI",
    color: "from-violet-500 to-[#07284a]",
    tasks: [
      { taskNumber: 1, title: "Image Classification", description: "Classify images using a Convolutional Neural Network (CNN) trained on a standard dataset.", features: ["CNN architecture", "Data augmentation", "Model training", "Accuracy evaluation"], outcome: "Understand deep learning fundamentals and build image recognition models from scratch." },
      { taskNumber: 2, title: "Chatbot", description: "Build an intelligent chatbot using NLP techniques and intent classification.", features: ["Intent recognition", "Entity extraction", "Conversation flow", "Response generation"], outcome: "Design conversational AI systems with natural language understanding capabilities." },
      { taskNumber: 3, title: "Sentiment Analysis", description: "Analyze product reviews and social media text to classify sentiment as positive, negative, or neutral.", features: ["Text preprocessing", "NLP pipeline", "Sentiment classification", "Visualization"], outcome: "Apply NLP techniques to extract sentiment from unstructured text data at scale." },
      { taskNumber: 4, title: "Resume Screening AI", description: "Build an AI system that automatically ranks and matches resumes to job descriptions.", features: ["Text extraction", "Similarity scoring", "Ranking algorithm", "Match visualization"], outcome: "Develop intelligent matching algorithms for automated candidate screening." },
      { taskNumber: 5, title: "Mini GPT / LLM Chatbot", description: "Build a chatbot powered by transformer models or LLM APIs for advanced conversations.", features: ["Transformer model", "Context memory", "Prompt engineering", "API integration"], outcome: "Work with large language models and understand transformer architecture fundamentals." },
      { taskNumber: 6, title: "Object Detection System", description: "Build an object detection system using YOLO or SSD with real-time video processing.", features: ["YOLO model", "Bounding boxes", "Real-time inference", "Video processing"], outcome: "Implement object detection pipelines for real-time visual recognition tasks." },
      { taskNumber: 7, title: "Generative AI Application", description: "Build an application using Stable Diffusion or GPT APIs for image/text generation.", features: ["API integration", "Prompt engineering", "Output customization", "Gallery interface"], outcome: "Leverage generative AI models to create applications that produce novel content." },
      { taskNumber: 8, title: "MLOps Pipeline", description: "Set up MLflow for experiment tracking, DVC for data versioning, and model registry.", features: ["MLflow tracking", "DVC data versioning", "Model registry", "Experiment comparison"], outcome: "Implement MLOps practices for reproducible ML experiments and model management." },
      { taskNumber: 9, title: "Model Optimization & Quantization", description: "Optimize models through quantization, pruning, and distillation for edge deployment.", features: ["Model quantization", "Pruning techniques", "Knowledge distillation", "Benchmarking"], outcome: "Deploy optimized ML models on resource-constrained devices without accuracy loss." },
      { taskNumber: 10, title: "AI-Powered Recommendation Engine", description: "Build a hybrid recommendation system combining collaborative and content-based filtering.", features: ["Hybrid filtering", "Feature extraction", "Real-time recommendations", "A/B evaluation"], outcome: "Design sophisticated recommendation engines that power personalized user experiences." },
      { taskNumber: 11, title: "Enterprise AI Solution", description: "Architect an end-to-end enterprise AI system with multiple models, pipelines, and dashboards.", features: ["Multi-model orchestration", "Pipeline automation", "Analytics dashboard", "Cost optimization"], outcome: "Design and deploy enterprise-grade AI solutions with scalable infrastructure." },
      { taskNumber: 12, title: "Deployment & Documentation", description: "Deploy models with FastAPI, containerize with Docker, set up monitoring, and document the system.", features: ["FastAPI deployment", "Docker/Kubernetes", "Model monitoring", "Technical documentation"], outcome: "Deliver production AI systems with robust APIs, monitoring, and complete documentation." },
    ],
  },
  {
    slug: "uiux",
    name: "UI / UX Design",
    icon: "UX",
    color: "from-amber-500 to-orange-600",
    tasks: [
      { taskNumber: 1, title: "Mobile App Design", description: "Design a complete mobile app UI in Figma with multiple screens and interactive prototypes.", features: ["Wireframes", "High-fidelity mockups", "Interactive prototype", "Design system"], outcome: "Master mobile UI design patterns and create professional app mockups." },
      { taskNumber: 2, title: "Website Redesign", description: "Redesign an existing website with modern UI patterns, improved UX, and better accessibility.", features: ["UX audit", "Wireframing", "Visual redesign", "Accessibility improvements"], outcome: "Apply UX research methods and redesign thinking to improve existing products." },
      { taskNumber: 3, title: "Design System", description: "Create a comprehensive design system with colors, typography, components, and usage guidelines.", features: ["Color palette", "Typography scale", "Component library", "Documentation"], outcome: "Build scalable design systems that ensure consistency across products." },
      { taskNumber: 4, title: "Dashboard UI", description: "Design a modern admin dashboard interface with data visualization and complex navigation.", features: ["Dashboard layout", "Data charts", "Navigation patterns", "Dark mode"], outcome: "Design complex data-heavy interfaces with intuitive information architecture." },
      { taskNumber: 5, title: "Case Study", description: "Complete a full UX case study from research through prototyping and user testing.", features: ["User research", "Problem definition", "Solution design", "Usability testing"], outcome: "Document and present a complete UX design process with professional deliverables." },
      { taskNumber: 6, title: "User Research & Testing", description: "Conduct user research with surveys, interviews, and usability testing sessions.", features: ["User surveys", "Interviews", "Usability testing", "Research synthesis"], outcome: "Apply user research methodologies to validate design decisions with real users." },
      { taskNumber: 7, title: "Motion Design & Prototyping", description: "Create advanced prototypes with micro-interactions, Lottie animations, and transitions.", features: ["Micro-interactions", "Lottie animations", "Transition flows", "Prototype testing"], outcome: "Design engaging motion experiences that enhance usability and delight users." },
      { taskNumber: 8, title: "Accessibility Audit & Improvements", description: "Audit designs for WCAG 2.1 compliance and implement accessibility improvements.", features: ["WCAG audit", "Color contrast", "Screen reader testing", "Keyboard navigation"], outcome: "Create inclusive designs that meet accessibility standards and serve all users." },
      { taskNumber: 9, title: "Design Operations & Handoff", description: "Establish design ops workflows with version control, handoff specs, and developer collaboration.", features: ["Design versioning", "Developer handoff", "Spec documentation", "Asset management"], outcome: "Streamline design-to-development workflows with efficient design operations." },
      { taskNumber: 10, title: "Cross-Platform Design Strategy", description: "Design a cohesive experience across web, mobile, and tablet with adaptive layouts.", features: ["Responsive adaptation", "Platform guidelines", "Consistent UX", "Design rationale"], outcome: "Create unified cross-platform experiences that feel native on every device." },
      { taskNumber: 11, title: "Enterprise Design System", description: "Build a comprehensive enterprise design system with advanced components, patterns, and guidelines.", features: ["Advanced components", "Interaction patterns", "Accessibility baked in", "Usage analytics"], outcome: "Architect and deliver enterprise-scale design systems for large product teams." },
      { taskNumber: 12, title: "Portfolio & Documentation", description: "Create a professional portfolio website showcasing all projects and a detailed UX case study.", features: ["Portfolio website", "Case study presentation", "Process documentation", "Client presentation"], outcome: "Present a compelling portfolio demonstrating end-to-end UX design expertise." },
    ],
  },
  {
    slug: "python",
    name: "Python Development",
    icon: "Py",
    color: "from-emerald-500 to-teal-600",
    tasks: [
      { taskNumber: 1, title: "Calculator App", description: "Build a feature-rich CLI calculator with support for arithmetic operations and history.", features: ["CLI interface", "Arithmetic operations", "History tracking", "Error handling"], outcome: "Strengthen Python fundamentals and build clean command-line applications." },
      { taskNumber: 2, title: "Web Scraper", description: "Build a web scraper using BeautifulSoup to extract and store data from websites.", features: ["HTML parsing", "Data extraction", "CSV export", "Rate limiting"], outcome: "Learn web scraping techniques and ethical data collection practices." },
      { taskNumber: 3, title: "Expense Tracker", description: "Track personal expenses with SQLite database, categories, and spending insights.", features: ["SQLite database", "Category management", "Spending reports", "Budget alerts"], outcome: "Build database-driven applications with SQL and data analysis capabilities." },
      { taskNumber: 4, title: "Automation Script", description: "Create an automation script to organize files, rename batches, and schedule tasks.", features: ["File operations", "Batch processing", "Scheduling", "Logging"], outcome: "Automate repetitive tasks and build efficient file processing pipelines." },
      { taskNumber: 5, title: "Flask Web Application", description: "Build a full CRUD web application using Flask framework with database integration.", features: ["Flask routes", "Database ORM", "Form validation", "Template rendering"], outcome: "Develop web applications with Python using the Flask micro-framework." },
      { taskNumber: 6, title: "Data Pipeline & ETL", description: "Build an ETL pipeline to extract, transform, and load data from multiple sources.", features: ["Data extraction", "Transformation logic", "Database loading", "Scheduled runs"], outcome: "Design and implement robust ETL pipelines for data integration workflows." },
      { taskNumber: 7, title: "FastAPI Web Service", description: "Build a high-performance async REST API using FastAPI with automatic docs.", features: ["FastAPI routes", "Async endpoints", "Pydantic validation", "Auto-generated docs"], outcome: "Build modern, high-performance APIs with automatic interactive documentation." },
      { taskNumber: 8, title: "Async Programming & WebSockets", description: "Implement async I/O operations and real-time WebSocket communication.", features: ["Asyncio patterns", "WebSocket server", "Concurrent tasks", "Event handling"], outcome: "Master asynchronous Python programming for high-concurrency applications." },
      { taskNumber: 9, title: "Testing & Code Quality", description: "Write comprehensive tests with pytest and set up linting, type checking, and coverage.", features: ["Pytest suite", "Type hints (mypy)", "Linting (ruff)", "Coverage reports"], outcome: "Ensure code quality with comprehensive testing and static analysis tooling." },
      { taskNumber: 10, title: "Package Distribution", description: "Package the application as a pip-installable module with setup.py and publish to PyPI.", features: ["Package structure", "Setup configuration", "PyPI publishing", "Version management"], outcome: "Distribute Python packages professionally through the Python Package Index." },
      { taskNumber: 11, title: "Enterprise Python Application", description: "Build a multi-module enterprise application with proper architecture and design patterns.", features: ["Modular architecture", "Design patterns", "Configuration management", "Logging system"], outcome: "Architect large-scale Python applications using enterprise design patterns." },
      { taskNumber: 12, title: "CI/CD & Documentation", description: "Set up GitHub Actions CI/CD, generate Sphinx docs, and create deployment scripts.", features: ["GitHub Actions", "Sphinx documentation", "Deployment scripts", "Release management"], outcome: "Deliver production-ready Python applications with automated CI/CD and documentation." },
    ],
  },
  {
    slug: "java",
    name: "Java Development",
    icon: "Jv",
    color: "from-red-500 to-orange-600",
    tasks: [
      { taskNumber: 1, title: "Student Management System", description: "Build a student management system using Java with MySQL database connectivity.", features: ["CRUD operations", "MySQL integration", "Search functionality", "Reports generation"], outcome: "Master Java database connectivity and build desktop database applications." },
      { taskNumber: 2, title: "Banking Application", description: "Build a banking application demonstrating OOP concepts like inheritance and polymorphism.", features: ["Account management", "Transactions", "OOP design", "Exception handling"], outcome: "Apply object-oriented programming principles to build real-world applications." },
      { taskNumber: 3, title: "REST API using Spring Boot", description: "Build a complete REST API with Spring Boot, JPA, and PostgreSQL integration.", features: ["Spring Boot", "JPA repositories", "REST endpoints", "PostgreSQL database"], outcome: "Develop production-ready REST APIs using the Spring Boot framework." },
      { taskNumber: 4, title: "Library Management System", description: "Build a library management system with book inventory and member management features.", features: ["Book catalog", "Member management", "Issue/Return tracking", "Fine calculation"], outcome: "Build complete management systems with complex business logic and workflows." },
      { taskNumber: 5, title: "E-Commerce Backend", description: "Build an e-commerce backend using Spring Boot with MySQL and RESTful APIs.", features: ["Product APIs", "Cart management", "Order processing", "Spring Security"], outcome: "Build enterprise-grade backends with Spring Boot and security integration." },
      { taskNumber: 6, title: "Microservices with Spring Cloud", description: "Decompose into microservices with Eureka, API Gateway, and Spring Cloud Config.", features: ["Eureka discovery", "Spring Cloud Gateway", "Config server", "Feign clients"], outcome: "Implement microservices architecture using the Spring Cloud ecosystem." },
      { taskNumber: 7, title: "Message Queue Integration", description: "Integrate RabbitMQ or Kafka for asynchronous messaging and event-driven communication.", features: ["RabbitMQ setup", "Message producers", "Message consumers", "Retry & DLQ"], outcome: "Build event-driven systems with message queue integration for decoupled services." },
      { taskNumber: 8, title: "Docker & Containerization", description: "Containerize Java/Spring Boot applications with Docker and orchestrate with Compose.", features: ["Dockerfile creation", "Docker Compose", "Multi-stage builds", "Container networking"], outcome: "Containerize Java applications for consistent development and deployment environments." },
      { taskNumber: 9, title: "Performance & Caching", description: "Implement Redis caching, connection pooling, and JVM performance tuning.", features: ["Redis caching", "Hibernate optimization", "Connection pooling", "JVM tuning"], outcome: "Optimize Java application performance with caching and JVM configuration expertise." },
      { taskNumber: 10, title: "GraphQL with Spring", description: "Build a GraphQL API layer using Spring for GraphQL with data loaders and subscriptions.", features: ["GraphQL schema", "Data loaders", "Subscriptions", "Security integration"], outcome: "Build efficient GraphQL APIs with Spring, solving N+1 query problems." },
      { taskNumber: 11, title: "Enterprise Microservices Application", description: "Build a comprehensive enterprise app with microservices, event sourcing, and CQRS.", features: ["Event sourcing", "CQRS pattern", "Saga orchestration", "Distributed tracing"], outcome: "Architect complex enterprise systems with advanced microservices patterns." },
      { taskNumber: 12, title: "Deployment & Documentation", description: "Deploy to Kubernetes, set up Jenkins CI/CD, create Swagger docs, and monitor with Grafana.", features: ["Kubernetes deployment", "Jenkins pipeline", "Swagger/OpenAPI", "Grafana monitoring"], outcome: "Deliver production-ready Java applications with complete CI/CD and monitoring." },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cyber Security",
    icon: "CS",
    color: "from-green-500 to-emerald-600",
    tasks: [
      { taskNumber: 1, title: "Password Strength Checker", description: "Build a tool to analyze password strength and provide security improvement suggestions.", features: ["Strength analysis", "Entropy calculation", "Common password check", "Security tips"], outcome: "Understand password security principles and implement strength evaluation algorithms." },
      { taskNumber: 2, title: "Port Scanner", description: "Build a network port scanner to identify open ports and running services on a target.", features: ["Port scanning", "Service detection", "Timeout handling", "Results export"], outcome: "Learn network security fundamentals and port scanning techniques." },
      { taskNumber: 3, title: "Vulnerability Assessment", description: "Perform basic security testing on web applications using common vulnerability scanners.", features: ["Vulnerability scanning", "Risk assessment", "Report generation", "Remediation guide"], outcome: "Identify common web vulnerabilities and understand security assessment methodologies." },
      { taskNumber: 4, title: "Secure Login System", description: "Build a login system with JWT authentication, encryption, and security best practices.", features: ["JWT authentication", "Password encryption", "Rate limiting", "Session management"], outcome: "Implement secure authentication systems with modern encryption standards." },
      { taskNumber: 5, title: "Phishing Detection Tool", description: "Build a tool to detect suspicious URLs and identify potential phishing attempts.", features: ["URL analysis", "Domain checking", "ML classification", "Alert system"], outcome: "Develop security tools to detect and prevent phishing attacks." },
      { taskNumber: 6, title: "Web Application Firewall", description: "Set up and configure ModSecurity WAF with custom rules to block common attacks.", features: ["WAF configuration", "OWASP rules", "Custom rule sets", "Log analysis"], outcome: "Deploy and configure web application firewalls to protect against attacks." },
      { taskNumber: 7, title: "SIEM & Log Analysis", description: "Set up ELK Stack for centralized log collection, analysis, and security monitoring.", features: ["ELK Stack setup", "Log ingestion", "Search & visualize", "Alert rules"], outcome: "Build security information and event management systems for threat detection." },
      { taskNumber: 8, title: "Penetration Testing Report", description: "Conduct a full penetration test on a target system and produce a professional report.", features: ["Reconnaissance", "Exploitation", "Post-exploitation", "Report writing"], outcome: "Perform systematic penetration testing and communicate findings professionally." },
      { taskNumber: 9, title: "Cryptography Implementation", description: "Implement encryption, hashing, and digital signature algorithms in Python/Java.", features: ["Symmetric encryption", "Asymmetric encryption", "Hashing algorithms", "Digital signatures"], outcome: "Apply cryptographic primitives to build secure data protection solutions." },
      { taskNumber: 10, title: "Security Automation", description: "Build automated security scanning scripts and compliance checking tools.", features: ["Automation scripts", "Compliance checks", "Scheduled scanning", "Alert integration"], outcome: "Automate security operations with custom tools and scheduled compliance checks." },
      { taskNumber: 11, title: "Enterprise Security Audit", description: "Conduct a comprehensive enterprise security audit covering network, app, and policy.", features: ["Network audit", "Application audit", "Policy review", "Risk assessment"], outcome: "Perform enterprise-level security audits and deliver actionable remediation plans." },
      { taskNumber: 12, title: "Security Policy & Documentation", description: "Create complete security policies, incident response plans, and compliance documentation.", features: ["Security policies", "Incident response plan", "Compliance mapping", "Training materials"], outcome: "Develop comprehensive security documentation aligned with industry standards (ISO 27001)." },
    ],
  },
  {
    slug: "digitalmarketing",
    name: "Digital Marketing",
    icon: "DM",
    color: "from-yellow-500 to-amber-600",
    tasks: [
      { taskNumber: 1, title: "SEO Audit", description: "Perform a complete SEO audit of a website and provide optimization recommendations.", features: ["Site analysis", "Keyword research", "Meta tag audit", "Performance check"], outcome: "Master SEO best practices and learn to optimize websites for search engines." },
      { taskNumber: 2, title: "Social Media Campaign", description: "Create a comprehensive social media campaign strategy with content calendar and KPIs.", features: ["Platform strategy", "Content calendar", "KPI tracking", "Budget planning"], outcome: "Design data-driven social media campaigns that drive engagement and conversions." },
      { taskNumber: 3, title: "Google Ads Campaign", description: "Plan and set up a Google Ads PPC campaign with keyword targeting and performance tracking.", features: ["Keyword planning", "Ad copywriting", "Budget optimization", "Conversion tracking"], outcome: "Run effective PPC campaigns with optimized budgets and measurable ROI." },
      { taskNumber: 4, title: "Email Marketing System", description: "Create professional email marketing templates and automation workflows.", features: ["Email templates", "Automation workflows", "A/B testing", "Analytics tracking"], outcome: "Build email marketing systems with automation and performance optimization." },
      { taskNumber: 5, title: "Analytics Dashboard", description: "Build a dashboard to track website traffic, user behavior, and marketing conversions.", features: ["Traffic tracking", "Conversion funnel", "User behavior", "Custom reports"], outcome: "Analyze marketing data and create dashboards that drive data-informed decisions." },
      { taskNumber: 6, title: "Content Marketing Strategy", description: "Develop a comprehensive content marketing plan with blog, video, and downloadable assets.", features: ["Content calendar", "Blog strategy", "Video marketing", "Lead magnets"], outcome: "Create content marketing strategies that attract, engage, and convert target audiences." },
      { taskNumber: 7, title: "Influencer Marketing Campaign", description: "Design an influencer marketing campaign with outreach, negotiation, and ROI tracking.", features: ["Influencer research", "Outreach templates", "Campaign tracking", "ROI analysis"], outcome: "Plan and execute influencer marketing campaigns with measurable business impact." },
      { taskNumber: 8, title: "Marketing Automation", description: "Set up marketing automation workflows using HubSpot or ActiveCampaign for lead nurturing.", features: ["CRM integration", "Automation workflows", "Lead scoring", "Email sequences"], outcome: "Build marketing automation systems that nurture leads through the sales funnel." },
      { taskNumber: 9, title: "Conversion Rate Optimization", description: "Run A/B tests on landing pages and funnels to improve conversion rates.", features: ["A/B test design", "Landing page optimization", "Funnel analysis", "Heatmap analysis"], outcome: "Apply CRO methodologies to systematically improve conversion rates across channels." },
      { taskNumber: 10, title: "Marketing Analytics & Attribution", description: "Build attribution models to measure marketing channel performance and customer LTV.", features: ["Attribution modeling", "CAC/LTV analysis", "Channel performance", "Dashboard reporting"], outcome: "Master marketing analytics with attribution models that demonstrate channel ROI." },
      { taskNumber: 11, title: "Full Marketing Strategy", description: "Develop a complete 360-degree marketing strategy with budget allocation and growth roadmap.", features: ["Market research", "Channel mix", "Budget allocation", "Growth roadmap"], outcome: "Create comprehensive marketing strategies that align with business goals and growth targets." },
      { taskNumber: 12, title: "Portfolio & Case Studies", description: "Build a professional portfolio website showcasing all campaigns with detailed case studies.", features: ["Portfolio website", "Campaign case studies", "Results showcase", "Client testimonials"], outcome: "Present a compelling portfolio demonstrating measurable marketing results and expertise." },
    ],
  },
];

export const LINKEDIN_TASK: TaskData = {
  taskNumber: 0,
  title: "Share Your Offer Letter on LinkedIn",
  description: "Post your Skyrovix offer letter on LinkedIn to celebrate your internship and inspire others.",
  features: [
    "Download your offer letter from the Onboarding tab",
    "Take a screenshot or share as PDF",
    "Post on LinkedIn with a professional caption",
    "Tag @Skyrovix and use #SkyrovixInternship",
  ],
  outcome: "Build your professional brand on LinkedIn and showcase your internship journey with your network.",
};

export function getDomainTasks(slug: string): DomainTasks | undefined {
  return ALL_DOMAINS_TASKS.find((d) => d.slug === slug);
}

export function getTasksByDuration(slug: string, durationMonths: number): TaskData[] {
  const domain = ALL_DOMAINS_TASKS.find((d) => d.slug === slug);
  if (!domain) return [];
  const taskLimits: Record<number, number> = { 1: 5, 2: 8, 3: 10, 6: 12 };
  const limit = taskLimits[durationMonths] ?? 5;
  return domain.tasks.filter((t) => t.taskNumber <= limit);
}
