import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm <span className="text-primary">Mayank Rathi</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
              Java & Spring Boot Developer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              I specialize in building robust and scalable backend applications using Java and Spring Boot.
              With a strong foundation in software development principles and best practices,
              I create efficient solutions that drive business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="btn btn-primary"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="btn bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-pulse"></div>
              <img
                src="/images/projects/ProfilePic.jpg"
                alt="Mayank Rathi"
                className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 