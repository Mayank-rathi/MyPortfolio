import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

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
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>

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