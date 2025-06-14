import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  topics: string[];
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  updated_at: string;
  homepage: string | null;
}

// Utility function for robust project name normalization
function normalizeProjectName(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const projectsPerPage = 6;

  // Project images mapping with high-quality open-source images
  const projectImages: { [key: string]: string } = {
    'Car-Parking-Lot': 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800&auto=format&fit=crop&q=60',
    'Employee-Wage-ComputationIn-In-Java': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60',
    'FlipCoinSimulation': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    'IPL-Analyser': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&auto=format&fit=crop&q=60',
    'Snake-And-Ladder-Simulator': 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&auto=format&fit=crop&q=60',
    'Tic-Tac-Toe-Game': 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&auto=format&fit=crop&q=60',
    'Bitbucket_PomFeatcher': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
    'AI_Bird_Finder': 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&auto=format&fit=crop&q=60',
    'OSWAP-velebrity-check': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    'Vulnerabilities-Check': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    'AI_TelegramBot_For_Stock_Alert': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60',
    'AI-Agent-Bot-Using-Botpress': 'https://images.unsplash.com/photo-1677442135136-760c813a743d?w=800&auto=format&fit=crop&q=60',
    'DevSecOps-CI-CD-Hotstar-Clone': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
    'devops-maven-docker': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    'webApp': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=60',
    'JenkinCrashCourse': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
    'excel-data-load': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60 ',
    'default': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60'
  };

  // Project descriptions mapping
  // Handle image loading error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = projectImages.default;
  };

    const fetchRepos = async () => {
      try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://api.github.com/users/Mayank-rathi/repos?sort=updated&per_page=100'
      );
      
        if (!response.ok) {
        if (response.status === 403) {
          const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
          const rateLimitReset = response.headers.get('x-ratelimit-reset');
          
          if (rateLimitRemaining === '0' && rateLimitReset) {
            const resetTime = new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString();
            throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}. Please try again later.`);
          }
          throw new Error('GitHub API access denied. Please check your authentication.');
        }
        if (response.status === 404) {
          throw new Error('GitHub user not found. Please check the username.');
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

        const data = await response.json();
      
      // Filter out .github.io repositories and sort by stars
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.name.includes('.github.io'))
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);

      if (filteredRepos.length === 0) {
        setError('No repositories found. Please check your GitHub profile.');
        return;
      }

        setRepos(filteredRepos);
      } catch (err) {
      console.error('Error fetching repositories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = repos.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(repos.length / projectsPerPage);

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>, repo: GitHubRepo) => {
    e.preventDefault();
    setSelectedProject(repo);
    setActiveTab('overview');
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Centralized, normalized scope mapping
  const projectScopes: { [key: string]: string[] } = {
    myportfolio: [
      'Developed a modern portfolio website using React 18, TypeScript, and Tailwind CSS',
      'Implemented responsive design with mobile-first approach using Tailwind CSS breakpoints',
      'Created reusable components like Header, Hero, About, Skills, Projects, and Contact sections',
      'Integrated GitHub API to fetch and display real-time repository data and statistics',
      'Implemented dark/light mode with theme persistence using localStorage',
      'Added smooth scroll behavior and animations using Framer Motion',
      'Integrated social media links (LinkedIn, GitHub, Twitter) with proper icons and hover effects',
      'Implemented project showcase with detailed modals showing project information, technologies, and live demos'
    ],
    bitbucketpomfeatcher: [
      'Developed a utility to fetch and analyze Maven POM files from Bitbucket repositories',
      'Implemented Bitbucket API integration for repository access',
      'Parsed XML POM files to extract dependency information',
      'Generated reports on project dependencies and versions',
      'Implemented error handling for API calls and file parsing',
      'Created a command-line interface for ease of use',
      'Added unit tests for core functionalities',
      'Documented usage and configuration'
    ],
    springbootmicroservices: [
      'Developed a microservices architecture using Spring Boot 3.x and Spring Cloud',
      'Implemented service discovery using Netflix Eureka for dynamic service registration',
      'Created API Gateway using Spring Cloud Gateway with route configuration and load balancing',
      'Implemented distributed tracing using Spring Cloud Sleuth and Zipkin',
      'Set up centralized configuration using Spring Cloud Config Server',
      'Implemented circuit breaker pattern using Resilience4j for fault tolerance',
      'Added JWT-based authentication and authorization across services',
      'Created Docker containers and Kubernetes manifests for deployment'
    ],
    javadesignpatterns: [
      'Implemented 23 Gang of Four design patterns with practical examples in Java',
      'Created Singleton pattern with thread-safe implementation and lazy initialization',
      'Implemented Factory and Abstract Factory patterns for object creation',
      'Developed Observer pattern for event handling and notification system',
      'Implemented Strategy pattern for interchangeable algorithms',
      'Created Decorator pattern for dynamic behavior extension',
      'Implemented Command pattern for request encapsulation and queuing',
      'Added comprehensive unit tests using JUnit 5 and Mockito'
    ],
    springsecuritydemo: [
      'Implemented JWT-based authentication with token generation and validation',
      'Created role-based access control (RBAC) with Spring Security',
      'Integrated OAuth2 with Google and GitHub for social login',
      'Implemented password encryption using BCrypt with salt',
      'Added session management with token refresh mechanism',
      'Configured security headers and CORS policies',
      'Implemented audit logging for security events',
      'Created security testing suite with JUnit and Spring Security Test'
    ],
    dockerkubernetesdemo: [
      'Created multi-container application using Docker Compose',
      'Set up Kubernetes cluster with Minikube for local development',
      'Implemented service discovery using Kubernetes Services',
      'Configured persistent volumes for data storage',
      'Set up monitoring using Prometheus and Grafana',
      'Implemented auto-scaling using Horizontal Pod Autoscaler',
      'Created deployment pipelines using GitHub Actions',
      'Added health checks and readiness probes'
    ],
    awscloudproject: [
      'Deployed serverless application using AWS Lambda and API Gateway',
      'Set up scalable storage using S3 for static content and RDS for database',
      'Implemented auto-scaling using EC2 Auto Scaling Groups',
      'Configured security groups and IAM roles',
      'Set up monitoring using CloudWatch and alarms',
      'Created infrastructure using AWS CDK with TypeScript',
      'Implemented CI/CD pipeline using AWS CodePipeline',
      'Added cost optimization using AWS Cost Explorer'
    ],
    reacttypescripttodo: [
      'Developed Todo application using React 18 and TypeScript',
      'Implemented state management using React Context API',
      'Added data persistence using localStorage',
      'Created reusable components with TypeScript interfaces',
      'Implemented filtering and sorting using custom hooks',
      'Added drag-and-drop using react-beautiful-dnd',
      'Implemented responsive design using Tailwind CSS',
      'Added unit tests using Jest and React Testing Library'
    ],
    nodejsexpressapi: [
      'Developed RESTful API using Node.js and Express',
      'Implemented JWT authentication and role-based authorization',
      'Added input validation using Joi and express-validator',
      'Set up MongoDB integration using Mongoose ODM',
      'Implemented rate limiting using express-rate-limit',
      'Added API documentation using Swagger/OpenAPI',
      'Set up logging using Winston and Morgan',
      'Created deployment configuration for production'
    ],
    mongodbexpressreact: [
      'Developed full-stack MERN application',
      'Created MongoDB schemas with Mongoose',
      'Implemented RESTful API endpoints with Express',
      'Developed React frontend with Redux Toolkit',
      'Added real-time updates using Socket.io',
      'Implemented user authentication with JWT',
      'Added data validation and error handling',
      'Created deployment scripts for production'
    ],
    githubactionscicd: [
      'Set up CI/CD pipeline using GitHub Actions',
      'Implemented automated testing using Jest',
      'Added code quality checks using ESLint and Prettier',
      'Configured automated deployment to AWS',
      'Added security scanning using GitHub Security',
      'Implemented environment-specific deployments',
      'Created deployment rollback workflows',
      'Added performance monitoring and reporting'
    ],
    aibirdfinder: [
      'Developed an AI-powered application to identify bird species from images.',
      'Integrated a pre-trained deep learning model for image classification.',
      'Built a user-friendly interface for uploading and analyzing bird photos.',
      'Implemented real-time feedback and suggestions for bird identification.',
      'Added a database of common bird species and their characteristics.',
      'Enabled sharing of results on social media platforms.',
      'Optimized model inference for fast response times.',
      'Documented the application for end users and contributors.'
    ],
    vulnerabilitiescheck: [
      'Created a tool to scan codebases for known security vulnerabilities.',
      'Integrated with public vulnerability databases (e.g., CVE, NVD).',
      'Implemented static code analysis for multiple programming languages.',
      'Generated detailed vulnerability reports with remediation suggestions.',
      'Added continuous integration hooks for automated security checks.',
      'Provided a web dashboard for monitoring and managing scan results.',
      'Enabled email notifications for critical vulnerabilities.',
      'Documented setup, usage, and best practices for secure development.'
    ],
    aitelegrambotforstockalert: [
      'Developed a Telegram bot to provide real-time stock alerts using AI.',
      'Integrated with financial APIs for live stock data and news.',
      'Implemented natural language processing for user queries.',
      'Added customizable alert thresholds and notification settings.',
      'Enabled multi-user support with personalized watchlists.',
      'Implemented sentiment analysis on stock-related news.',
      'Deployed the bot on a cloud server for high availability.',
      'Documented bot commands, setup, and usage for end users.'
    ],
    aiagentbotusingbotpress: [
      'Built an AI-powered conversational agent using the Botpress framework.',
      'Designed multi-turn dialogues for customer support scenarios.',
      'Integrated with external APIs for dynamic information retrieval.',
      'Implemented intent recognition and entity extraction.',
      'Added fallback and escalation mechanisms for unhandled queries.',
      'Provided analytics dashboard for conversation insights.',
      'Deployed the bot on web and messaging platforms.',
      'Documented bot flows, training data, and deployment steps.'
    ],
    devsecopscicdhotstarclone: [
      'Designed and implemented a CI/CD pipeline for a Hotstar clone using DevSecOps best practices.',
      'Integrated static code analysis and security scanning tools (e.g., SonarQube, Trivy) into the pipeline.',
      'Automated build, test, and deployment stages using Jenkins and GitHub Actions.',
      'Configured containerization with Docker and orchestrated deployments with Kubernetes.',
      'Implemented automated vulnerability checks and compliance reporting.',
      'Enabled rollback and recovery strategies for failed deployments.',
      'Provided monitoring and alerting for pipeline health and security events.',
      'Documented the entire DevSecOps workflow for team onboarding and audits.'
    ],
    devopsmavendocker: [
      'Developed a DevOps workflow integrating Maven for build automation and Docker for containerization.',
      'Automated the build and packaging of Java applications using Maven.',
      'Created Dockerfiles and multi-stage builds for efficient image creation.',
      'Set up a local Docker registry for image storage and distribution.',
      'Implemented automated testing and code quality checks in the pipeline.',
      'Deployed containers to local and cloud environments.',
      'Monitored container health and resource usage.',
      'Documented setup, usage, and troubleshooting steps for the workflow.'
    ],
    webapp: [
      'Developed a full-stack web application with a modern JavaScript framework.',
      'Implemented responsive UI/UX with mobile-first design principles.',
      'Integrated RESTful APIs for dynamic data fetching and updates.',
      'Added authentication and authorization for secure access.',
      'Implemented state management for complex user interactions.',
      'Deployed the application to a cloud platform for public access.',
      'Set up CI/CD for automated testing and deployment.',
      'Documented features, API endpoints, and deployment instructions.'
    ],
    jenkincrashcourse: [
      'Created a comprehensive Jenkins crash course for DevOps beginners.',
      'Developed hands-on labs covering pipeline creation, build triggers, and notifications.',
      'Integrated source control (Git) and automated build/test steps.',
      'Demonstrated plugin usage for extended Jenkins functionality.',
      'Showcased best practices for pipeline as code (Jenkinsfile).',
      'Included troubleshooting tips and common error resolutions.',
      'Provided sample projects and reusable pipeline templates.',
      'Documented all course materials and lab instructions.'
    ],
    configgraphapi: [
      'Developed a GraphQL API for dynamic configuration management.',
      'Implemented schema design for flexible and scalable configuration queries.',
      'Added authentication and role-based access control to the API.',
      'Integrated with a backend database for persistent storage.',
      'Enabled real-time updates and subscriptions for configuration changes.',
      'Provided API documentation and example queries/mutations.',
      'Set up automated testing for schema validation and endpoint coverage.',
      'Deployed the API to a cloud environment with monitoring and logging.'
    ]
  };

  // Technologies mapping (normalized keys, validated)
  const projectTechnologies: { [key: string]: string[] } = {
    myportfolio: [
      'React 18', 'TypeScript', 'Tailwind CSS', 'GitHub API', 'Vercel', 'Framer Motion', 'ESLint', 'Prettier'
    ],
    bitbucketpomfeatcher: [
      'Java','Spring Boot', 'Bitbucket API', 'Requests', 'XML Parsing (ElementTree)', 'argparse', 'pytest'
    ],
    springbootmicroservices: [
      'Java', 'Spring Boot', 'Spring Cloud', 'Netflix Eureka', 'Spring Cloud Gateway', 'REST APIs', 'Docker', 'Kubernetes', 'Maven', 'JWT'
    ],
    javadesignpatterns: [
      'Java', 'Maven', 'JUnit', 'Design Patterns (GoF)', 'UML'
    ],
    springsecuritydemo: [
      'Java', 'Spring Boot', 'Spring Security', 'JWT', 'OAuth2', 'BCrypt', 'Maven', 'JUnit'
    ],
    dockerkubernetesdemo: [
      'Docker', 'Docker Compose', 'Kubernetes', 'Minikube', 'Prometheus', 'Grafana'
    ],
    awscloudproject: [
      'AWS Lambda', 'API Gateway', 'S3', 'RDS', 'EC2', 'CloudWatch', 'AWS CDK', 'IAM'
    ],
    reacttypescripttodo: [
      'React 18', 'TypeScript', 'Tailwind CSS', 'React Context API', 'Jest', 'React Testing Library'
    ],
    nodejsexpressapi: [
      'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Swagger', 'Winston'
    ],
    mongodbexpressreact: [
      'MongoDB', 'Express.js', 'React', 'Redux Toolkit', 'Socket.io', 'JWT'
    ],
    githubactionscicd: [
      'GitHub Actions', 'YAML', 'Jest', 'ESLint', 'Prettier'
    ],
    aibirdfinder: [
      'Python', 'TensorFlow/Keras', 'Flask', 'OpenCV', 'React', 'REST API'
    ],
    vulnerabilitiescheck: [
      'Python', 'CVE/NVD APIs', 'Static Code Analysis', 'Flask', 'Docker'
    ],
    aitelegrambotforstockalert: [
      'Python', 'Telegram Bot API', 'Financial APIs', 'NLTK/Spacy', 'Docker'
    ],
    aiagentbotusingbotpress: [
      'Botpress', 'Node.js', 'JavaScript', 'REST API', 'NLP'
    ],
    devsecopscicdhotstarclone: [
      'Jenkins', 'GitHub Actions', 'SonarQube', 'Trivy', 'Docker', 'Kubernetes', 'Helm', 'Prometheus', 'Grafana'
    ],
    devopsmavendocker: [
      'Maven', 'Docker', 'Java', 'Jenkins', 'Git'
    ],
    webapp: [
      'React', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Tailwind CSS'
    ],
    jenkincrashcourse: [
      'Jenkins', 'Groovy', 'Git', 'Docker', 'Jenkins Plugins'
    ],
    configgraphapi: [
      'Node.js', 'GraphQL', 'Apollo Server', 'MongoDB', 'JWT'
    ]
  };

  if (loading) {
    return (
      <section id="projects" className="section bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section bg-gray-50 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg max-w-2xl mx-auto">
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section bg-gray-50 dark:bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work and contributions to open-source projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((repo) => (
            <div
              key={repo.id}
              className="group bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={projectImages[repo.name] || projectImages.default}
                  alt={repo.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-lg font-semibold mb-2">{repo.name}</p>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {repo.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300">
                  {repo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {repo.description || 'No description available'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full transform hover:scale-110 transition-transform duration-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>⭐</span>
                    {repo.stargazers_count}
                  </span>
                </div>
                <div className="flex gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    View Project
                  </a>
                  <a
                    href="#"
                    onClick={(e) => handleDemoClick(e, repo)}
                    className="flex-1 text-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    View Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Demo Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {selectedProject.name}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                  <nav className="flex space-x-8">
                    {['overview', 'scope', 'technologies', 'links'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === 'overview' && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Project Overview</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedProject.description || 'No description available'}
                      </p>
                    </div>
                  )}

                  {activeTab === 'scope' && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Scope of Work
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        {(() => {
                          const normalizedName = normalizeProjectName(selectedProject.name);
                          const scope = projectScopes[normalizedName];
                          if (!scope) {
                            console.warn('Missing scope for project:', selectedProject.name, '| Normalized:', normalizedName);
                          }
                          return scope && scope.length > 0 ? (
                            scope.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 dark:text-gray-400">
                              No scope information available for this project.
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'technologies' && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Technologies Used
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {(() => {
                          const normalizedName = normalizeProjectName(selectedProject.name);
                          const techs = projectTechnologies[normalizedName];
                          if (!techs) {
                            console.warn('Missing technologies for project:', selectedProject.name, '| Normalized:', normalizedName);
                          }
                          return techs && techs.length > 0 ? (
                            techs.map((tech, idx) => (
                              <li key={idx} className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                {tech}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 dark:text-gray-400">
                              No technology information available for this project.
                            </li>
                          );
                        })()}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'links' && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Project Links</h4>
                      <div className="space-y-4">
                        <a
                          href={selectedProject.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                          <span className="text-lg">📦</span>
                          <span>View on GitHub</span>
                        </a>
                        {selectedProject.homepage && (
                          <a
                            href={selectedProject.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                          >
                            <span className="text-lg">🔗</span>
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={(e) => handlePageChange(e, currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={(e) => handlePageChange(e, index + 1)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === index + 1
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={(e) => handlePageChange(e, currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 