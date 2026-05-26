import { Metadata } from "next";
import { durationLabel, formatMonths, monthsBetween } from "@/lib/duration";
import {
  CHATI_INTERN_START,
  CHATI_INTERN_END,
  CHATI_JR_START,
  PROMINDS_START,
} from "@/lib/portfolio-data";

const SITE_URL = "https://www.anuppradhan.in";
const AUTHOR_NAME = "Anup Pradhan";


// Static page — re-render daily so durations stay fresh between deploys.
export const revalidate = 86400;

// SEO Metadata for Experience page
export const metadata: Metadata = {
  metadataBase: new URL("https://www.anuppradhan.in"),
  title: "Experience | Junior Software Developer (Lead AI Engineer) @ CHATI · FreeSWITCH + WebRTC",
  description:
    "Experience of Anup Pradhan: Junior Software Developer (Lead AI Engineer) at CHATI (Mar 2026–Present) architecting a B2B AI Voice Calling SaaS with FreeSWITCH, ESL, and WebRTC; part-time at Prominds Digital — shipped AutoPulse, a multi-tenant B2B CRM for automotive dealerships with RBAC, WhatsApp automation, and RabbitMQ.",
  keywords: [
    "Anup Pradhan Experience",
    "Junior Software Developer",
    "Lead AI Engineer",
    "Junior Software Developer CHATI",
    "Software Developer Intern CHATI",
    "Software Developer Bhubaneswar",
    "AI Voice Calling SaaS",
    "FreeSWITCH Developer",
    "WebRTC Developer",
    "ESL Developer",
    "VoIP Engineer",
    "STT TTS LLM Pipeline",
    "AI Meeting Assistant",
    "AutoPulse CRM",
    "Prominds Digital",
    "Backend Developer India",
    "Data Pipeline Engineer",
    "Union-Find Deduplication",
    "RabbitMQ",
    "Bhubaneswar Software Developer",
  ],
  authors: [{ name: "Anup Pradhan", url: "https://www.anuppradhan.in" }],
  creator: "Anup Pradhan",
  publisher: "Anup Pradhan",
  openGraph: {
    title: "Experience | Junior Software Developer (Lead AI Engineer) @ CHATI · FreeSWITCH + WebRTC",
    description:
      "Junior Software Developer (Lead AI Engineer) at CHATI (Mar 2026–Present) — B2B AI Voice Calling SaaS on FreeSWITCH + WebRTC. Part-time at Prominds Digital — AutoPulse B2B CRM.",
    type: "profile",
    url: "https://www.anuppradhan.in/experience",
    siteName: "Anup Pradhan - Developer Portfolio",
    locale: "en_IN",
    images: [
      {
        url: "https://www.anuppradhan.in/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Anup Pradhan — Junior Software Developer (Lead AI Engineer) experience",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnupPradhan0",
    creator: "@AnupPradhan0",
    title: "Experience | Junior Software Developer (Lead AI Engineer) @ CHATI · FreeSWITCH + WebRTC",
    description:
      "Junior Software Developer (Lead AI Engineer) at CHATI — B2B AI Voice Calling SaaS on FreeSWITCH + WebRTC. Part-time at Prominds Digital — AutoPulse B2B CRM.",
    images: ["https://www.anuppradhan.in/images/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.anuppradhan.in/experience",
    languages: {
      en: "https://www.anuppradhan.in/experience",
    },
  },
  category: "Technology",
  classification: "Professional Experience",
};

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function buildStructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    url: SITE_URL,
    mainEntityOfPage: `${SITE_URL}/experience`,
    image: `${SITE_URL}/images/logo.jpg`,
    jobTitle: "Junior Software Developer (Lead AI Engineer)",
    hasOccupation: [
      {
        "@type": "EmployeeRole",
        roleName: "Junior Software Developer (Lead AI Engineer)",
        startDate: toIso(CHATI_JR_START),
        worksFor: {
          "@type": "Organization",
          name: "CHATI",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bhubaneswar",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "EmployeeRole",
        roleName: "Software Developer Intern",
        startDate: toIso(CHATI_INTERN_START),
        endDate: toIso(CHATI_INTERN_END),
        worksFor: { "@type": "Organization", name: "CHATI" },
      },
      {
        "@type": "EmployeeRole",
        roleName: "Part-time Developer",
        startDate: toIso(PROMINDS_START),
        worksFor: {
          "@type": "Organization",
          name: "Prominds Digital",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Bhubaneswar",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/experience#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experience",
        item: `${SITE_URL}/experience`,
      },
    ],
  };

  return { personSchema, breadcrumbSchema };
}

export default function Experience() {
  const { personSchema, breadcrumbSchema } = buildStructuredData();
  const now = new Date();

  const chatiTotal = durationLabel(CHATI_INTERN_START, now);
  const chatiJr = durationLabel(CHATI_JR_START, now);
  const chatiIntern = formatMonths(monthsBetween(CHATI_INTERN_START, CHATI_INTERN_END));
  const promindsTotal = durationLabel(PROMINDS_START, now);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section
        id="experience-section"
        aria-labelledby="experience-heading"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div lang="en">
          <header>
            <h1 id="experience-heading" itemProp="name">
              Experience
            </h1>
            <p>
              Professional roles as a Software Developer at CHATI and Prominds
              Digital — architecting B2B AI Voice Calling SaaS on FreeSWITCH/WebRTC,
              scalable multi-tenant CRM for automotive dealerships, and large-scale
              data pipelines.
            </p>
          </header>

          <div>
            {/* CHATI */}
            <article
              aria-labelledby="chati-heading"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <header>
                <h2 id="chati-heading" itemProp="name">
                  CHATI
                </h2>
                <p>
                  <strong>{chatiTotal}</strong> · Bhubaneswar, Odisha, India ·
                  On-site
                </p>
              </header>

              {/* Junior Software Developer — Lead AI Engineer (current) */}
              <section aria-labelledby="chati-jr-heading">
                <h3 id="chati-jr-heading">
                  Junior Software Developer (Lead AI Engineer) · Full-time
                </h3>
                <p>
                  <time dateTime={toIso(CHATI_JR_START)}>Mar 2026</time> —
                  Present · {chatiJr}
                </p>
                <ul itemProp="description">
                  <li>
                    Product Leadership: Serving as lead developer architecting a
                    B2B AI Voice Calling SaaS platform for automated inbound and
                    outbound voice systems.
                  </li>
                  <li>
                    Telephony Infrastructure: Engineering high-availability VoIP
                    infrastructure using FreeSWITCH, ESL, and WebRTC to
                    orchestrate real-time, low-latency audio streaming.
                  </li>
                  <li>
                    Voice AI Pipeline: Integrating low-latency STT, LLM
                    orchestration, and TTS pipelines to deliver human-like
                    conversational responses during live calls.
                  </li>
                </ul>
              </section>

              {/* Software Developer Intern */}
              <section aria-labelledby="chati-intern-heading">
                <h3 id="chati-intern-heading">
                  Software Developer Intern · Internship
                </h3>
                <p>
                  <time dateTime={toIso(CHATI_INTERN_START)}>Oct 2025</time> —{" "}
                  <time dateTime={toIso(CHATI_INTERN_END)}>Mar 2026</time> ·{" "}
                  {chatiIntern}
                </p>
                <ul itemProp="description">
                  <li>
                    AI Meeting Assistant: Built an AI assistant for Zoom, Teams,
                    and Google Meet that automates recording and transcript
                    summaries for 500+ active users.
                  </li>
                  <li>
                    High-Performance Pipeline: Engineered a batch-processing
                    system that cleaned, validated, and migrated 1.2M+ records
                    into production in under 10 minutes.
                  </li>
                  <li>
                    Algorithmic Deduplication: Designed a Union–Find based
                    clustering system to deduplicate related records in near
                    O(1) time per link.
                  </li>
                </ul>
              </section>
            </article>

            {/* Prominds Digital */}
            <article
              aria-labelledby="prominds-heading"
              itemScope
              itemType="https://schema.org/Organization"
            >
              <header>
                <h2 id="prominds-heading" itemProp="name">
                  Prominds Digital
                </h2>
                <p>
                  <strong>Part-time · {promindsTotal}</strong> · Bhubaneswar,
                  Odisha, India
                </p>
              </header>

              <ul itemProp="description">
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
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

