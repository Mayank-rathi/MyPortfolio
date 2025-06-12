import React from 'react';

interface Skill {
  name: string;
  icon: string;
  category: string;
  proficiency: number; // 0-100
}

const skills: Skill[] = [
  // Backend Development
  { name: 'Java', icon: '☕', category: 'Backend Development', proficiency: 95 },
  { name: 'Spring Boot', icon: '🌱', category: 'Backend Development', proficiency: 90 },
  { name: 'Spring Security', icon: '🔒', category: 'Backend Development', proficiency: 85 },
  { name: 'Spring Data JPA', icon: '💾', category: 'Backend Development', proficiency: 90 },
  { name: 'REST APIs', icon: '🌐', category: 'Backend Development', proficiency: 95 },
  { name: 'Microservices', icon: '🔧', category: 'Backend Development', proficiency: 85 },
  { name: 'Hibernate', icon: '🔄', category: 'Backend Development', proficiency: 85 },
  { name: 'JUnit', icon: '🧪', category: 'Backend Development', proficiency: 90 },
  { name: 'Mockito', icon: '🎭', category: 'Backend Development', proficiency: 85 },
  
  // Database
  { name: 'MySQL', icon: '🐬', category: 'Database', proficiency: 90 },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database', proficiency: 85 },
  { name: 'MongoDB', icon: '🍃', category: 'Database', proficiency: 75 },
  
  // Tools & Technologies
  { name: 'Git', icon: '📦', category: 'Tools & Technologies', proficiency: 95 },
  { name: 'Maven', icon: '📚', category: 'Tools & Technologies', proficiency: 90 },
  { name: 'Docker', icon: '🐳', category: 'Tools & Technologies', proficiency: 85 },
  { name: 'Jenkins', icon: '⚙️', category: 'Tools & Technologies', proficiency: 85 },
  { name: 'Postman', icon: '📡', category: 'Tools & Technologies', proficiency: 90 },
  { name: 'Swagger', icon: '📝', category: 'Tools & Technologies', proficiency: 85 },
  
  // Design & Architecture
  { name: 'Design Patterns', icon: '🎨', category: 'Design & Architecture', proficiency: 90 },
  { name: 'SOLID Principles', icon: '📐', category: 'Design & Architecture', proficiency: 90 },
  { name: 'Clean Code', icon: '✨', category: 'Design & Architecture', proficiency: 95 },
  { name: 'OOP', icon: '🔄', category: 'Design & Architecture', proficiency: 95 },
  { name: 'System Design', icon: '🏗️', category: 'Design & Architecture', proficiency: 85 },
  
  // Additional Skills
  { name: 'Agile', icon: '📋', category: 'Methodologies', proficiency: 90 },
  { name: 'Scrum', icon: '📊', category: 'Methodologies', proficiency: 90 },
  { name: 'CI/CD', icon: '🔄', category: 'DevOps', proficiency: 85 },
  { name: 'AWS', icon: '☁️', category: 'Cloud', proficiency: 75 }
];

const Skills: React.FC = () => {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="section bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive collection of technical skills and expertise developed through years of professional experience
          </p>
        </div>
        
        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold mb-8 text-primary border-b border-gray-200 dark:border-gray-700 pb-4">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </span>
                        <div className="flex-1">
                          <span className="font-semibold text-gray-800 dark:text-gray-200 block mb-1">
                            {skill.name}
                          </span>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-primary to-blue-600 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
            <span className="text-2xl">🎯</span>
            <span className="font-semibold text-lg">25+ Verified Skills</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 