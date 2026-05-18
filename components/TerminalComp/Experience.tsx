"use client";

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { durationLabel, formatMonths, monthsBetween } from "@/lib/duration";

// Role start/end dates — single source of truth. Durations recompute automatically
// on every render, so the visible "X mos" / "Y yr Z mos" labels stay current
// without manual edits each month.
const CHATI_INTERN_START = new Date(2025, 10, 1); // Nov 2025
const CHATI_INTERN_END = new Date(2026, 3, 1);    // Apr 2026 (promotion)
const CHATI_JR_START = new Date(2026, 3, 1);      // Apr 2026

const PROMINDS_WP_START = new Date(2025, 3, 1);   // Apr 2025
const PROMINDS_FS_START = new Date(2025, 10, 1);  // Nov 2025

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

  // Computed once per mount — accurate to the day the user opens the page.
  const duration = useMemo(() => {
    const now = new Date();
    return {
      chatiTotal: durationLabel(CHATI_INTERN_START, now),
      chatiIntern: formatMonths(
        monthsBetween(CHATI_INTERN_START, CHATI_INTERN_END)
      ),
      chatiJr: durationLabel(CHATI_JR_START, now),
      promindsTotal: durationLabel(PROMINDS_WP_START, now),
      promindsFs: durationLabel(PROMINDS_FS_START, now),
      promindsWp: durationLabel(PROMINDS_WP_START, now),
    };
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

            <div className="ml-3 sm:ml-6 border-l-2 border-green-800/30 pl-3 sm:pl-6 space-y-8">
              {/* CHATI */}
              <div className="border-b border-green-800/20 pb-6">
                {/* Company header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="shrink-0">
                    <Image
                      src="/images/Chati.ico"
                      alt="CHATI"
                      title="CHATI"
                      width={64}
                      height={64}
                      className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg border border-green-800/50 bg-black/40 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                      CHATI
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {duration.chatiTotal}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Bhubaneswar, Odisha, India · On-site
                    </p>
                  </div>
                </div>

                {/* Nested roles with vertical timeline */}
                <ol className="relative border-l-2 border-green-800/30 ml-5 sm:ml-7 space-y-6">
                  {/* Junior Software Developer (current) */}
                  <li className="pl-4 sm:pl-5 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-black shadow-[0_0_0_2px_rgba(74,222,128,0.35)]"
                    />
                    <h4 className="text-green-400 font-semibold text-sm sm:text-base font-mono">
                      Junior Software Developer
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Full-time</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Apr 2026 — Present · {duration.chatiJr}
                    </p>
                    <p className="mt-2 text-gray-300 text-sm sm:text-base">
                      Currently working as a Junior Software Developer at CHATI
                      after being promoted from the internship role — continuing
                      to build on the AI calling and meeting-assistant platform
                      with WebRTC and SIP-protocol work.
                    </p>
                  </li>

                  {/* Software Developer Intern */}
                  <li className="pl-4 sm:pl-5 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-green-700"
                    />
                    <h4 className="text-green-400 font-semibold text-sm sm:text-base font-mono">
                      Software Developer Intern
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Internship</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Nov 2025 — Apr 2026 · {duration.chatiIntern}
                    </p>

                    <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-5">
                      <li>
                        AI Meeting Assistant: architected a multi-platform bot
                        (Zoom, Teams, Meet) for live transcription and
                        summaries, scaling to 500+ active users.
                      </li>
                      <li>
                        Custom CMS: designed and deployed an end-to-end,
                        scalable CMS from scratch to streamline internal
                        content operations.
                      </li>
                      <li>
                        Data Engineering: engineered a high-performance pipeline
                        to migrate 1.2M records cross-referenced with 920K
                        records, bringing total execution time under 10
                        minutes.
                      </li>
                      <li>
                        Designed a Union–Find based deduplication system that
                        groups related citizen records into clusters in near
                        O(1) per link, keeping
                        <code className="mx-1">/v1/citizen/all/unverified</code>
                        fast and scalable.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>

              {/* Prominds Digital */}
              <div>
                {/* Company header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="shrink-0">
                    <Image
                      src="/images/PromindsD.png"
                      alt="Prominds Digital"
                      title="Prominds Digital"
                      width={64}
                      height={64}
                      className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg border border-green-800/50 bg-black/40 object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-green-400 font-semibold text-base sm:text-lg font-mono">
                      Prominds Digital
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Part-time · {duration.promindsTotal}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Bhubaneswar, Odisha, India · Remote
                    </p>
                  </div>
                </div>

                {/* Nested roles with vertical timeline */}
                <ol className="relative border-l-2 border-green-800/30 ml-5 sm:ml-7 space-y-6">
                  {/* Full Stack Developer (current) */}
                  <li className="pl-4 sm:pl-5 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-black shadow-[0_0_0_2px_rgba(74,222,128,0.35)]"
                    />
                    <h4 className="text-green-400 font-semibold text-sm sm:text-base font-mono">
                      Full Stack Developer
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Nov 2025 — Present · {duration.promindsFs}
                    </p>

                    <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-5">
                      <li>
                        Developed an automotive visitor-management SaaS used
                        across 5 dealerships (5k+ monthly entries), with
                        WhatsApp automation and lead pipelines built in.
                      </li>
                      <li>
                        Managing the architectural shift and migration of
                        legacy infrastructure to a modern, streamlined CRM
                        solution.
                      </li>
                    </ul>
                  </li>

                  {/* WordPress Developer */}
                  <li className="pl-4 sm:pl-5 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-green-700"
                    />
                    <h4 className="text-green-400 font-semibold text-sm sm:text-base font-mono">
                      WordPress Developer
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Apr 2025 — Present · {duration.promindsWp}
                    </p>

                    <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-5">
                      <li>
                        Launched 5 WordPress websites and improved performance
                        scores by 50%, achieving a peak score of 84.
                      </li>
                    </ul>
                  </li>
                </ol>
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
