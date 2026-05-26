"use client";

import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { durationLabel, formatMonths, monthsBetween } from "@/lib/duration";
import { TypewriterText, MatrixRain } from "@/components/TerminalComp/effects";
import {
  CHATI_INTERN_START,
  CHATI_INTERN_END,
  CHATI_JR_START,
  PROMINDS_START,
} from "@/lib/portfolio-data";



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
      promindsTotal: durationLabel(PROMINDS_START, now),
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
                  {/* Junior Software Developer — Lead AI Engineer (current) */}
                  <li className="pl-4 sm:pl-5 relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-green-400 ring-2 ring-black shadow-[0_0_0_2px_rgba(74,222,128,0.35)]"
                    />
                    <h4 className="text-green-400 font-semibold text-sm sm:text-base font-mono">
                      Junior Software Developer (Lead AI Engineer)
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">Full-time</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Mar 2026 — Present · {duration.chatiJr}
                    </p>

                    <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-5">
                      <li>
                        Product Leadership: Serving as lead developer
                        architecting a B2B AI Voice Calling SaaS platform for
                        automated inbound and outbound voice systems.
                      </li>
                      <li>
                        Telephony Infrastructure: Engineering high-availability
                        VoIP infrastructure using FreeSWITCH, ESL, and WebRTC to
                        orchestrate real-time, low-latency audio streaming.
                      </li>
                      <li>
                        Voice AI Pipeline: Integrating low-latency STT, LLM
                        orchestration, and TTS pipelines to deliver human-like
                        conversational responses during live calls.
                      </li>
                    </ul>
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
                      Oct 2025 — Mar 2026 · {duration.chatiIntern}
                    </p>

                    <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-4 sm:ml-5">
                      <li>
                        AI Meeting Assistant: Built an AI assistant for Zoom,
                        Teams, and Google Meet that automates recording and
                        transcript summaries for 500+ active users.
                      </li>
                      <li>
                        High-Performance Pipeline: Engineered a batch-processing
                        system that cleaned, validated, and migrated 1.2M+
                        records into production in under 10 minutes.
                      </li>
                      <li>
                        Algorithmic Deduplication: Designed a Union–Find based
                        clustering system to deduplicate related records in near
                        O(1) time per link.
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
                      Bhubaneswar, Odisha, India
                    </p>
                  </div>
                </div>

                <ul className="mt-3 list-disc list-outside space-y-1 text-gray-300 text-sm sm:text-base ml-9 sm:ml-12">
                  <li>
                    Multi-Tenant SaaS Architecture: Architected and shipped
                    AutoPulse, a scalable B2B CRM for automotive dealerships
                    featuring granular Role-Based Access Control (RBAC) and
                    organization-level feature toggles.
                  </li>
                  <li>
                    Production Deployment: Successfully deployed the platform
                    across 5+ active dealerships, processing 5,000+ monthly
                    visitor entries with production-grade lead pipeline
                    reliability.
                  </li>
                  <li>
                    Automated Messaging &amp; Scaling: Built automated WhatsApp
                    follow-up workflows and high-throughput CRM data migration
                    tools using RabbitMQ for message queuing.
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
