import React from 'react';

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', icon: '☕', category: 'Languages' },
  { name: 'SQL', icon: '📊', category: 'Languages' },
  { name: 'HTML', icon: '🌐', category: 'Languages' },
  { name: 'CSS', icon: '🎨', category: 'Languages' },
  { name: 'Shell Scripting', icon: '🐚', category: 'Languages' },
  { name: 'YAML', icon: '📝', category: 'Languages' },
  { name: 'Linux CLI', icon: '🐧', category: 'Languages' },

  // Frameworks & Libraries
  { name: 'Spring Core', icon: '🌱', category: 'Frameworks & Libraries' },
  { name: 'Spring Boot', icon: '🚀', category: 'Frameworks & Libraries' },
  { name: 'Spring MVC', icon: '🔄', category: 'Frameworks & Libraries' },
  { name: 'Spring Security', icon: '🔒', category: 'Frameworks & Libraries' },
  { name: 'Hibernate', icon: '💾', category: 'Frameworks & Libraries' },
  { name: 'JPA', icon: '🗄️', category: 'Frameworks & Libraries' },
  { name: 'Jackson', icon: '🔄', category: 'Frameworks & Libraries' },
  { name: 'Lombok', icon: '⚡', category: 'Frameworks & Libraries' },
  { name: 'JSP', icon: '📄', category: 'Frameworks & Libraries' },
  { name: 'JSTL', icon: '🏷️', category: 'Frameworks & Libraries' },
  { name: 'Thymeleaf', icon: '🍃', category: 'Frameworks & Libraries' },
  { name: 'RESTful APIs', icon: '🌐', category: 'Frameworks & Libraries' },
  { name: 'JSON/XML', icon: '📋', category: 'Frameworks & Libraries' },

  // Databases
  { name: 'MySQL', icon: '🐬', category: 'Databases' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Databases' },
  { name: 'MongoDB', icon: '🍃', category: 'Databases' },
  { name: 'GraphQL', icon: '📊', category: 'Databases' },
  { name: 'Redis', icon: '🔴', category: 'Databases' },
  { name: 'H2 Database', icon: '💾', category: 'Databases' },

  // DevOps & Cloud
  { name: 'Docker', icon: '🐳', category: 'DevOps & Cloud' },
  { name: 'Jenkins', icon: '⚙️', category: 'DevOps & Cloud' },
  { name: 'Concourse CI', icon: '🔄', category: 'DevOps & Cloud' },
  { name: 'Gradle', icon: '⚡', category: 'DevOps & Cloud' },
  { name: 'Maven', icon: '📦', category: 'DevOps & Cloud' },
  { name: 'AWS EC2', icon: '☁️', category: 'DevOps & Cloud' },
  { name: 'AWS S3', icon: '🗄️', category: 'DevOps & Cloud' },
  { name: 'AWS RDS', icon: '💾', category: 'DevOps & Cloud' },
  { name: 'AWS IAM', icon: '🔑', category: 'DevOps & Cloud' },
  { name: 'AWS Lambda', icon: '⚡', category: 'DevOps & Cloud' },
  { name: 'Azure DevOps', icon: '☁️', category: 'DevOps & Cloud' },
  { name: 'CI/CD', icon: '🚀', category: 'DevOps & Cloud' },

  // Testing & API Tools
  { name: 'Postman', icon: '📬', category: 'Testing & API Tools' },
  { name: 'ReadyAPI', icon: '🧪', category: 'Testing & API Tools' },
  { name: 'JUnit', icon: '✅', category: 'Testing & API Tools' },
  { name: 'Mockito', icon: '🎭', category: 'Testing & API Tools' },
  { name: 'Swagger', icon: '📝', category: 'Testing & API Tools' },

  // Monitoring & Observability
  { name: 'Kibana', icon: '📊', category: 'Monitoring & Observability' },
  { name: 'Grafana', icon: '📈', category: 'Monitoring & Observability' },
  { name: 'Splunk', icon: '🔍', category: 'Monitoring & Observability' },
  { name: 'Dynatrace', icon: '📊', category: 'Monitoring & Observability' },
  { name: 'Prometheus', icon: '🔥', category: 'Monitoring & Observability' },

  // Version Control & IDEs
  { name: 'Git', icon: '🐙', category: 'Version Control & IDEs' },
  { name: 'GitHub', icon: '💻', category: 'Version Control & IDEs' },
  { name: 'GitLab', icon: '🦊', category: 'Version Control & IDEs' },
  { name: 'Bitbucket', icon: '🪣', category: 'Version Control & IDEs' },
  { name: 'IntelliJ IDEA', icon: '💡', category: 'Version Control & IDEs' },
  { name: 'Eclipse', icon: '🌑', category: 'Version Control & IDEs' },
  { name: 'VS Code', icon: '💻', category: 'Version Control & IDEs' },

  // Project & Collaboration Tools
  { name: 'Jira', icon: '🎯', category: 'Project & Collaboration Tools' },
  { name: 'Confluence', icon: '📚', category: 'Project & Collaboration Tools' },
  { name: 'Slack', icon: '💬', category: 'Project & Collaboration Tools' },
  { name: 'MS Teams', icon: '👥', category: 'Project & Collaboration Tools' },
  { name: 'Miro', icon: '🎨', category: 'Project & Collaboration Tools' },

  // Operating Systems
  { name: 'Windows', icon: '🪟', category: 'Operating Systems' },
  { name: 'macOS', icon: '🍎', category: 'Operating Systems' },
  { name: 'Linux', icon: '🐧', category: 'Operating Systems' },

  // AI Tools & Coding Assistants
  { name: 'GitHub Copilot', icon: '🤖', category: 'AI Tools & Coding Assistants' },
  { name: 'Cursor AI', icon: '✍️', category: 'AI Tools & Coding Assistants' },
  { name: 'Cline', icon: '💻', category: 'AI Tools & Coding Assistants' },
  { name: 'RooCode', icon: '🦘', category: 'AI Tools & Coding Assistants' },
  { name: 'Gemini', icon: '♊', category: 'AI Tools & Coding Assistants' },
  { name: 'Grok', icon: '🧠', category: 'AI Tools & Coding Assistants' },
  { name: 'ChatGPT', icon: '💬', category: 'AI Tools & Coding Assistants' },
];

const Skills: React.FC = () => {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="section bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise in software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-5 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-5 text-primary border-b border-gray-200 dark:border-gray-600 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-600 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                    >
                      <span className="text-xl mb-1 transform group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </span>
                      <span className="text-xs text-gray-800 dark:text-gray-100 font-medium text-center">
                        {skill.name}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 