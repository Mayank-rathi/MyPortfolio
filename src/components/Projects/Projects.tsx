import React, { useEffect, useState } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  stargazers_count: number;
  forks_count: number;
}

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl: string;
  date: string;
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Sample project images - replace with your actual project images
  const projectImages: { [key: string]: string } = {
    'xmeme': '/images/projects/xmeme.png',
    'qeats': '/images/projects/qeats.png',
    'qmoney': '/images/projects/qmoney.png',
    'ai agent bot using botpress': '/images/projects/Ai_Image_Genration_Bot_Home_Decore.png',
    'default': '/images/projects/default.png'
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Mayank-rathi/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        const filteredRepos = data
          .filter((repo: GitHubRepo) => !repo.name.includes('.github.io'))
          .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
        setRepos(filteredRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = repos.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(repos.length / projectsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section id="projects" className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Projects</h2>
          <div className="text-center">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="section bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Projects</h2>
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((repo) => (
            <div
              key={repo.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={projectImages[repo.name.toLowerCase()] || projectImages.default}
                  alt={repo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <p className="text-lg font-semibold">{repo.name}</p>
                    <p className="text-sm">{repo.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{repo.name}</h3>
                  <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {repo.description || 'No description available'}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <span className="mr-1">⭐</span>
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">🔀</span>
                    {repo.forks_count}
                  </span>
                  {repo.language && (
                    <span className="flex items-center">
                      <span className="mr-1">💻</span>
                      {repo.language}
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary flex-1 text-center"
                  >
                    View Code
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 flex-1 text-center"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
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
              onClick={() => handlePageChange(currentPage + 1)}
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