import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About Me</h2>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
          <p className="text-lg mb-4">
            <strong>Experienced Java Developer</strong> with over 5 years of hands-on expertise in designing, developing, and deploying scalable backend solutions. I specialize in Java, Spring Boot, and microservices architecture, with a strong focus on clean code, best practices, and delivering business value. My experience spans across building RESTful APIs, integrating DevOps pipelines, and optimizing cloud deployments.
          </p>
          <p className="mb-4">
            Currently, I am working at <strong>T-Systems ICT India Pvt. Ltd.</strong> where I contribute to enterprise-grade software solutions. I am passionate about continuous learning and have earned multiple certifications in DevOps, cloud, and backend technologies.
          </p>
          <ul className="mb-4 list-disc list-inside text-gray-700 dark:text-gray-200">
            <li><strong>Backend Development:</strong> Java, Spring Boot, Hibernate, REST APIs, Microservices</li>
            <li><strong>Cloud & DevOps:</strong> AWS, Azure, Docker, Kubernetes, Jenkins, CI/CD</li>
            <li><strong>Databases:</strong> PostgreSQL, MongoDB, Redis, MySQL</li>
            <li><strong>Frontend (Basic):</strong> HTML5, CSS3, Bootstrap</li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-2">Education</h3>
          <p className="mb-4">B.E. in Computer Engineering, Terna Engineering College (2014 - 2018)</p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Certifications</h3>
          <ul className="mb-4 list-disc list-inside text-gray-700 dark:text-gray-200">
            <li>Core DevOps Skills: Agile & DevOps (T-Systems ICT India Pvt. Ltd., 2025)</li>
            <li>API Development: REST & SOAP Web Services (Skillsoft, 2022)</li>
            <li>API Error Handling: Best Practices (Skillsoft, 2022)</li>
            <li>MS Azure DevOps Solutions: Manage Code Quality & Security Policies (Skillsoft, 2022)</li>
            <li>Master Microservices with Spring Boot and Spring Cloud (Udemy, 2022)</li>
            <li>Learn Java Functional Programming with Lambdas & Streams (Udemy, 2021)</li>
            <li>Master Java Unit Testing with Spring Boot & Mockito (Udemy, 2021)</li>
            <li>Performance Testing Course with JMeter and Blazemeter (Udemy, 2021)</li>
            <li>Oracle Database 11g Administrator Certified Professional (Terna Engineering College, 2015)</li>
          </ul>
          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
            <a
              href="https://www.linkedin.com/in/mayank-rathi-53230b14b/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              LinkedIn Profile
            </a>
            <a
              href="https://github.com/Mayank-rathi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 