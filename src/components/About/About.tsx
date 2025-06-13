import React, { useState } from 'react';

interface AboutSection {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

const About: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>('professional-summary');

  const aboutSections: AboutSection[] = [
    {
      id: 'professional-summary',
      title: 'Professional Summary',
      icon: '👨‍💻',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            I am a passionate Java and Spring Boot developer with over 5 years of experience in designing, developing, and deploying scalable backend solutions. 
            Currently working at T-Systems ICT India Pvt. Ltd., I specialize in building robust microservices architecture and implementing CI/CD pipelines.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            My expertise spans across Java, Spring Boot, RESTful APIs, and cloud technologies. I am committed to writing clean, efficient code and following 
            best practices to deliver high-quality solutions that drive business growth.
          </p>
        </div>
      ),
    },
    {
      id: 'experience',
      title: 'Professional Experience',
      icon: '💼',
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Senior Java Developer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">T-Systems ICT India Pvt. Ltd. • 2021 - Present</p>
            <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Leading development of microservices architecture using Spring Boot and Spring Cloud</li>
              <li>• Implementing CI/CD pipelines using Jenkins and Docker for automated deployments</li>
              <li>• Optimizing database performance and reducing query time by 40%</li>
              <li>• Integrating third-party services and payment gateways</li>
              <li>• Mentoring junior developers and conducting code reviews</li>
            </ul>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Java Developer</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">T-Systems ICT India Pvt. Ltd. • 2019 - 2021</p>
            <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Developed RESTful APIs using Spring MVC and Spring Boot</li>
              <li>• Implemented unit testing with JUnit and Mockito</li>
              <li>• Worked with PostgreSQL and MongoDB databases</li>
              <li>• Integrated Swagger for API documentation</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'education',
      title: 'Education',
      icon: '🎓',
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Bachelor of Engineering in Computer Engineering</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Terna Engineering College • 2014 - 2018</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Graduated with focus on software engineering, database management systems, and computer networks.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'certifications',
      title: 'Certifications',
      icon: '🏆',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Core DevOps Skills: Agile & DevOps</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">T-Systems ICT India Pvt. Ltd. • 2025</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">API Development: REST & SOAP Web Services</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Skillsoft • 2022</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">API Error Handling: Best Practices</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Skillsoft • 2022</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">MS Azure DevOps Solutions</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Skillsoft • 2022</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Master Microservices with Spring Boot</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Udemy • 2022</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Java Functional Programming</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Udemy • 2021</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Java Unit Testing with Spring Boot</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Udemy • 2021</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Performance Testing with JMeter</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Udemy • 2021</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Oracle Database Administrator</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Terna Engineering College • 2015</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="section bg-gray-50 dark:bg-gray-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A passionate Java developer with expertise in building scalable backend solutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {aboutSections.map((section) => (
              <div
                key={section.id}
                className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {section.title}
                    </h3>
                  </div>
                  <span className={`transform transition-transform duration-300 ${
                    activeSection === section.id ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    activeSection === section.id
                      ? 'max-h-[1000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 