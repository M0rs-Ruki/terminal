"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

// Typewriter effect component
interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 50,
}) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse text-green-400">|</span>
      )}
    </span>
  );
};

// Matrix rain effect (responsive)
const MatrixRain: React.FC = () => {
  const chars = "01";
  const columns =
    typeof window !== "undefined" && window.innerWidth < 768 ? 20 : 50;

  const [columnDelays] = useState(() =>
    Array.from({ length: columns }, () => Math.random() * 5)
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      {Array.from({ length: columns }).map((_, i) => (
        <div
          key={i}
          className="absolute text-green-400 text-xs font-mono"
          style={{
            left: `${(i * 100) / columns}%`,
            animation: `matrix-fall 10s linear infinite ${columnDelays[i]}s`,
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="opacity-20">
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Experience: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <MatrixRain />

      <div
        className={`relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Terminal header */}
        <div className="mb-6 sm:mb-8 border border-green-800 bg-black/50 backdrop-blur-sm rounded-lg p-3 sm:p-4">
          <div>
            <span className="text-green-400 font-mono text-sm sm:text-base">
              <TypewriterText text="Loading experience..." delay={50} />
            </span>
          </div>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {/* Experience Section */}
          <section className="border border-green-800/30 bg-gradient-to-br from-green-900/10 to-black/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-green-900/20 hover:shadow-green-900/40 transition-all duration-500">
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="text-green-400 font-mono mr-2 sm:mr-4"></span>
              <h2 className="text-lg sm:text-2xl text-green-400 font-bold font-mono tracking-wider">
                EXPERIENCE.log
              </h2>
              <div className="ml-auto">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="ml-3 sm:ml-6 border-l-2 border-green-800/30 pl-3 sm:pl-6 space-y-6">
              {/* CHATI */}
              <div className="border-b border-green-800/20 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <Image
                        src="/images/Chati.ico"
                        alt="CHATI — Software Developer (Internship)"
                        title="CHATI — Software Developer (Internship)"
                        width={64}
                        height={64}
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg border border-green-800/50 bg-black/40 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                        Software Developer
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        CHATI · Internship
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Oct 2025 — Present · Bhubaneswar, Odisha, India ·
                        On-site
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-6">
                  <li>
                    Developed an AI-powered meeting assistant that joins calls,
                    records conversations, and generates structured
                    transcript-based summaries.
                  </li>
                  <li>
                    Integrated the platform with Zoom, Microsoft Teams, and
                    Google Meet to support a growing base of 500+ active users.
                  </li>
                  <li>
                    Architected a custom CMS to manage internal content and
                    operational workflows for the product team.
                  </li>
                  <li>
                    Engineered a high-performance data pipeline to clean,
                    validate, and migrate over 1.2M records into production
                    safely.
                  </li>
                  <li>
                    Implemented chunked and batch-processing strategies with
                    strict validation to keep only high-quality data in the
                    main database.
                  </li>
                  <li>
                    Designed and implemented a Union–Find based deduplication
                    system that groups related citizen records into duplicate
                    clusters in near O(1) time per link, keeping
                    <code className="mx-1">/v1/citizen/all/unverified</code>
                    fast and scalable.
                  </li>
                  <li>
                    Achieved high-speed validation and migration across 1.2M+
                    records cross-referenced with 920K+ records in under 10
                    minutes.
                  </li>
                </ul>
              </div>

              {/* Prominds Digital */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <Image
                        src="/images/PromindsD.png"
                        alt="Prominds Digital — Software Developer"
                        title="Prominds Digital — Software Developer (Part-time)"
                        width={64}
                        height={64}
                        className="h-12 w-12 sm:h-16 sm:w-16 rounded-lg border border-green-800/50 bg-black/40 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                        Software Developer
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        Prominds Digital · Part-time
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Jul 2024 — Present · Bhubaneswar, Odisha, India ·
                        On-site
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-6">
                  <li>
                    Architected and shipped a scalable SaaS showroom visitor
                    management system for automotive dealerships.
                  </li>
                  <li>
                    Deployed the platform across 5+ dealerships, processing over
                    5,000 visitor entries every month with reliable uptime.
                  </li>
                  <li>
                    Integrated core features including automated WhatsApp
                    follow-ups, digital enquiry tracking, and end-to-end lead
                    pipelines.
                  </li>
                  <li>
                    Delivered multiple full-stack web applications tailored to
                    diverse business workflows and requirements.
                  </li>
                  <li>
                    Optimized performance across key modules, significantly
                    improving core web vitals and user experience.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Status footer */}
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

export default Experience;
