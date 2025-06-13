import React from 'react';

const Contact: React.FC = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mayank-rathi-53230b14b/',
      icon: 'linkedin',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Mayank-rathi',
      icon: 'github',
      color: 'bg-gray-800 hover:bg-gray-900'
    },
    {
      name: 'Twitter',
      url: 'https://x.com/MayankRathi33',
      icon: 'twitter',
      color: 'bg-blue-400 hover:bg-blue-500'
    }
  ];

  return (
    <section id="contact" className="section bg-white dark:bg-gray-900">
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Get in Touch</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Feel free to reach out to me through any of these platforms:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${link.color} text-white px-6 py-3 rounded-lg transition-colors duration-300`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Direct Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Email:</span>{' '}
                <a 
                  href="mailto:mayankrathi33@gmail.com" 
                  className="text-primary hover:underline"
                >
                  mayankrathi33@gmail.com
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Location:</span> Maharashtra, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 