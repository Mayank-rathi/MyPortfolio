import React, { useState, useEffect } from 'react';

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

  // Project images mapping
  const projectImages: { [key: string]: string } = {
    'Car-Parking-Lot': '/images/projects/car-parking.png',
    'Employee-Wage-ComputationIn-In-Java': '/images/projects/employee-wage.png',
    'FlipCoinSimulation': '/images/projects/flip-coin.png',
    'IPL-Analyser': '/images/projects/ipl-analyser.png',
    'Snake-And-Ladder-Simulator': '/images/projects/snake-ladder.png',
    'Tic-Tac-Toe-Game': '/images/projects/tic-tac-toe.png',
    'default': '/images/projects/default.png'
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
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={projectImages[repo.name] || projectImages.default}
                  alt={repo.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <p className="text-lg font-semibold">{repo.name}</p>
                    <p className="text-sm mt-2">{repo.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {repo.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {repo.description || 'No description available'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{repo.language}</span>
                  <span>⭐ {repo.stargazers_count}</span>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={(e) => handlePageChange(e, index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={(e) => handlePageChange(e, currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
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