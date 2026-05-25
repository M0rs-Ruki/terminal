import React, { useState, useEffect } from "react";
import { TypewriterText, MatrixRain } from "@/components/TerminalComp/effects";

// Enhanced SVG Icons with hover animations - Mobile responsive
const CodeIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 sm:w-8 sm:h-8 mb-1.5 sm:mb-2 text-green-400 group-hover:text-green-300 transition-all duration-300 group-hover:scale-110"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const SystemIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 sm:w-8 sm:h-8 mb-1.5 sm:mb-2 text-green-400 group-hover:text-green-300 transition-all duration-300 group-hover:scale-110"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);


const About: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Matrix background effect */}
      <MatrixRain />

      {/* Main content - Mobile responsive container */}
      <div
        className={`relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Terminal header - Mobile responsive */}
        <div className="mb-6 sm:mb-8 border border-green-800 bg-black/50 backdrop-blur-sm rounded-lg p-3 sm:p-4">
          <div>
            <span className="text-green-400 font-mono text-sm sm:text-base">
              <TypewriterText text="Loading developer profile..." delay={50} />
            </span>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {/* About Me Section - Mobile optimized */}
          <section className="border border-green-800/30 bg-gradient-to-br from-green-900/10 to-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-green-900/20 hover:shadow-green-900/40 transition-all duration-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="text-green-400 font-mono mr-2 sm:mr-4"></span>
              <h2 className="text-lg sm:text-2xl text-green-400 font-bold font-mono tracking-wider">
                ABOUT_ME.exe
              </h2>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="ml-3 sm:ml-6 border-l-2 border-green-800/30 pl-3 sm:pl-6">
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-light">
                I&apos;m a{" "}
                <span className="text-green-400 font-semibold">
                  Software Developer
                </span>{" "}
                with a backend focus, building reliable RESTful APIs and
                full‑stack applications using MongoDB, Express.js, React,
                Node.js, and TypeScript, with JWT‑based auth and responsive
                interfaces in React, Tailwind, HTML/CSS, and EJS. Strong in data
                modeling with Mongoose, media handling via Cloudinary
                integration (storage/CDN, not a database), and pragmatic tooling
                across Git/GitHub, Docker, Postman, and API testing for robust
                delivery.​ Comfortable augmeting products with AI/ML libraries
                (TensorFlow, NumPy, pandas) and shipping to Vercel/Render,
                guided by a build‑to‑learn mindset and ongoing BCA studies (CGPA
                8.93)..
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
                {[
                  "MongoDB",
                  "Express",
                  "React",
                  "Node.js",
                  "JavaScript",
                  "TypeScript",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 sm:px-3 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-xs sm:text-sm font-mono hover:bg-green-800/30 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Education Section - Mobile optimized */}
          <section className="border border-green-800/30 bg-gradient-to-br from-green-900/10 to-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-green-900/20 hover:shadow-green-900/40 transition-all duration-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="text-green-400 font-mono mr-2 sm:mr-4"></span>
              <h2 className="text-lg sm:text-2xl text-green-400 font-bold font-mono tracking-wider">
                EDUCATION.log
              </h2>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="ml-3 sm:ml-6 border-l-2 border-green-800/30 pl-3 sm:pl-6 space-y-6">
              {/* Amity University */}
              <div className="border-b border-green-800/20 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                    Amity University
                  </h3>
                  <span className="text-gray-400 text-sm font-mono">
                    2024 — 2027
                  </span>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  Doing my Bachelors of Computer Application (BCA).
                </p>
                <div className="mt-2">
                  <span className="px-2 py-1 bg-green-900/30 border border-green-800/50 rounded-full text-green-400 text-xs font-mono">
                    CGPA: 8.93
                  </span>
                </div>
              </div>

              {/* Autonomous College Khariar */}
              <div className="border-b border-green-800/20 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                    Autonomous College Khariar
                  </h3>
                  <span className="text-gray-400 text-sm font-mono">
                    2022 — 2024
                  </span>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  I did my 11th and 12th in I.T.
                </p>
              </div>

              {/* High School */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                    High School
                  </h3>
                  <span className="text-gray-400 text-sm font-mono">
                    2009 — 2022
                  </span>
                </div>
                <p className="text-gray-300 text-sm sm:text-base">
                  I did my schooling from our village school.
                </p>
              </div>
            </div>
          </section>


          {/* Current focus - Mobile responsive grid */}
          <section>
            <div className="flex items-center mb-6 sm:mb-8">
              <span className="text-green-400 font-mono mr-2 sm:mr-4"></span>
              <h2 className="text-lg sm:text-2xl text-green-400 font-bold font-mono tracking-wider">
                CURRENT_FOCUS.log
              </h2>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Responsive grid: 1 column on mobile, 2 on tablet+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Chati - Junior Software Developer card */}
              <div className="group border border-green-800/40 bg-gradient-to-br from-green-900/20 to-black/80 backdrop-blur-sm p-3 sm:p-5 rounded-xl hover:border-green-400/60 transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-2xl hover:shadow-green-900/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <CodeIcon />
                  </div>
                  <h3 className="font-bold text-green-400 text-base sm:text-lg mb-2 font-mono">
                    Junior Software Developer @ CHATI
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Working on AI-powered calling software, building real-time
                    voice flows on top of{" "}
                    <span className="text-green-400 font-semibold">WebRTC</span>{" "}
                    and{" "}
                    <span className="text-green-400 font-semibold">SIP</span>{" "}
                    protocols. Hands-on with media negotiation, signaling, and
                    integrating the AI agent into the live call pipeline.
                  </p>
                </div>
              </div>

              {/* System design + automation card */}
              <div className="group border border-green-800/40 bg-gradient-to-br from-green-900/20 to-black/80 backdrop-blur-sm p-3 sm:p-5 rounded-xl hover:border-green-400/60 transition-all duration-500 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-2xl hover:shadow-green-900/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <SystemIcon />
                  </div>
                  <h3 className="font-bold text-green-400 text-base sm:text-lg mb-2 font-mono">
                    System Design & Automation
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Studying{" "}
                    <span className="text-green-400 font-semibold">
                      system design
                    </span>{" "}
                    and architecture patterns, refactoring old projects to apply
                    what I learn, and building small automation tools to remove
                    repetitive work from my day-to-day flow.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Status footer - Mobile responsive */}
          <div className="mt-8 sm:mt-12 border-t border-green-800/30 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-green-400/70 font-mono text-xs sm:text-sm space-y-2 sm:space-y-0">
              <span>Status: Ready for new challenges</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes matrix-fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
