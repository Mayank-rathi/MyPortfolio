import React from 'react';
import { useParams } from 'react-router-dom';

interface ProjectDetails {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  // Add any other fields you want to display on the project detail page
}

interface ProjectDataMap {
  [key: string]: ProjectDetails;
}

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();

  // In a real application, you would fetch project data here based on projectName
  // For now, we'll use a placeholder
  const projectData: ProjectDataMap = {
    'ai-agent-bot-using-botpress': {
      title: 'AI Agent Bot Using Botpress',
      description: 'This project integrates an AI agent with Botpress to provide intelligent conversational capabilities. It leverages advanced natural language processing to understand user queries and respond appropriately.',
      imageUrl: '/images/projects/Ai_Image_Genration_Bot_Home_Decore.png',
      // You can add more details like technologies, GitHub repo link, etc.
    },
    'ai_bird_finder': {
      title: 'AI Bird Finder',
      description: 'This project is a Next.js application designed to help users find and identify birds. It provides a user-friendly interface for searching and viewing bird information.',
      imageUrl: '/images/projects/ai_bird_finder.png',
    },
    'ai_telegrambot_for_stock_alert': {
      title: 'AI Telegram Bot For Stock Alert',
      description: 'This project involves an AI-powered Telegram bot that provides stock alerts based on predefined criteria. It uses real-time data to notify users about market changes.',
      imageUrl: '/images/projects/ai_telegrambot_for_stock_alert.png',
      demoUrl: 'https://chartink.com/screener/sniper-scanner',
    },
    // Add more project details here as needed
  };

  const currentProject = projectName ? projectData[projectName.toLowerCase()] : null;

  if (!currentProject) {
    return (
      <section className="section bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white">Project Not Found</h2>
      </section>
    );
  }

  return (
    <section className="section bg-white dark:bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {currentProject.title}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {currentProject.imageUrl && (
            <div className="md:w-1/2">
              <img
                src={currentProject.imageUrl}
                alt={currentProject.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="md:w-1/2 text-gray-700 dark:text-gray-300">
            <p className="text-lg leading-relaxed mb-4">
              {currentProject.description}
            </p>
            {currentProject.demoUrl && (
              <a
                href={currentProject.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-shadow"
              >
                View Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail; 