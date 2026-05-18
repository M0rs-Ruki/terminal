import { Metadata } from "next";
import { durationLabel, formatMonths, monthsBetween } from "@/lib/duration";

const SITE_URL = "https://www.anuppradhan.in";
const AUTHOR_NAME = "Anup Pradhan";

// Single source of truth for role timestamps. Duration labels recompute on every
// request — no monthly manual edits.
const CHATI_INTERN_START = new Date(2025, 10, 1); // Nov 2025
const CHATI_INTERN_END = new Date(2026, 3, 1);    // Apr 2026 (promoted)
const CHATI_JR_START = new Date(2026, 3, 1);      // Apr 2026
const PROMINDS_WP_START = new Date(2025, 3, 1);   // Apr 2025
const PROMINDS_FS_START = new Date(2025, 10, 1);  // Nov 2025

// Static page — re-render daily so durations stay fresh between deploys.
export const revalidate = 86400;

// SEO Metadata for Experience page
export const metadata: Metadata = {
  metadataBase: new URL("https://www.anuppradhan.in"),
  title: "Experience | Junior Software Developer @ CHATI · WebRTC + SIP",
  description:
    "Experience of Anup Pradhan: Junior Software Developer at CHATI (promoted from intern, Apr 2026) building AI-powered calling software on WebRTC and SIP; part-time Full Stack / WordPress Developer at Prominds Digital — SaaS for automotive dealerships, large-scale data migration, and high-performance web apps.",
  keywords: [
    "Anup Pradhan Experience",
    "Junior Software Developer",
    "Junior Software Developer CHATI",
    "Software Developer Intern CHATI",
    "Software Developer Bhubaneswar",
    "AI Calling Developer",
    "WebRTC Developer",
    "SIP Developer",
    "Real-time Voice Engineer",
    "AI Meeting Assistant",
    "Full Stack Developer Prominds Digital",
    "WordPress Developer",
    "Backend Developer India",
    "Promotion Junior Software Developer",
    "Data Pipeline Engineer",
    "Union-Find Deduplication",
    "Bhubaneswar Software Developer",
  ],
  authors: [{ name: "Anup Pradhan", url: "https://www.anuppradhan.in" }],
  creator: "Anup Pradhan",
  publisher: "Anup Pradhan",
  openGraph: {
    title: "Experience | Junior Software Developer @ CHATI · WebRTC + SIP",
    description:
      "Junior Software Developer at CHATI (promoted from intern Apr 2026) — AI calling on WebRTC + SIP. Part-time Full Stack / WordPress Developer at Prominds Digital.",
    type: "profile",
    url: "https://www.anuppradhan.in/experience",
    siteName: "Anup Pradhan - Developer Portfolio",
    locale: "en_IN",
    images: [
      {
        url: "https://www.anuppradhan.in/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Anup Pradhan — Junior Software Developer experience",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AnupPradhan0",
    creator: "@AnupPradhan0",
    title: "Experience | Junior Software Developer @ CHATI · WebRTC + SIP",
    description:
      "Junior Software Developer at CHATI building AI calling software on WebRTC + SIP. Part-time Full Stack / WordPress Developer at Prominds Digital.",
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
    jobTitle: "Junior Software Developer",
    hasOccupation: [
      {
        "@type": "EmployeeRole",
        roleName: "Junior Software Developer",
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
        roleName: "Full Stack Developer",
        startDate: toIso(PROMINDS_FS_START),
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
      {
        "@type": "EmployeeRole",
        roleName: "WordPress Developer",
        startDate: toIso(PROMINDS_WP_START),
        worksFor: { "@type": "Organization", name: "Prominds Digital" },
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
  const promindsTotal = durationLabel(PROMINDS_WP_START, now);
  const promindsFs = durationLabel(PROMINDS_FS_START, now);
  const promindsWp = durationLabel(PROMINDS_WP_START, now);

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
              Digital — building AI calling platforms on WebRTC/SIP, scalable
              SaaS for automotive dealerships, and large-scale data pipelines.
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

              {/* Junior Software Developer (current) */}
              <section aria-labelledby="chati-jr-heading">
                <h3 id="chati-jr-heading">
                  Junior Software Developer · Full-time
                </h3>
                <p>
                  <time dateTime={toIso(CHATI_JR_START)}>Apr 2026</time> —
                  Present · {chatiJr}
                </p>
                <p>
                  Promoted from the internship role. Continuing to build the AI
                  calling platform on top of <strong>WebRTC</strong> and{" "}
                  <strong>SIP</strong> — media negotiation, signaling, and
                  integrating the AI agent into live calls.
                </p>
              </section>

              {/* Software Developer Intern */}
              <section aria-labelledby="chati-intern-heading">
                <h3 id="chati-intern-heading">
                  Software Developer Intern · Internship
                </h3>
                <p>
                  <time dateTime={toIso(CHATI_INTERN_START)}>Nov 2025</time> —{" "}
                  <time dateTime={toIso(CHATI_INTERN_END)}>Apr 2026</time> ·{" "}
                  {chatiIntern}
                </p>
                <ul itemProp="description">
                  <li>
                    AI Meeting Assistant — architected a multi-platform bot
                    (Zoom, Microsoft Teams, Google Meet) for live transcription
                    and summaries, scaling to 500+ active users.
                  </li>
                  <li>
                    Custom CMS — designed and deployed an end-to-end, scalable
                    CMS from scratch to streamline internal content operations.
                  </li>
                  <li>
                    Data Engineering — engineered a high-performance pipeline
                    to migrate 1.2M records cross-referenced with 920K records,
                    bringing total execution time under 10 minutes.
                  </li>
                  <li>
                    Designed a Union–Find based deduplication system that
                    groups related citizen records into clusters in near O(1)
                    per link, keeping <code>/v1/citizen/all/unverified</code>{" "}
                    fast and scalable.
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
                  Odisha, India · Remote
                </p>
              </header>

              {/* Full Stack Developer (current) */}
              <section aria-labelledby="prominds-fs-heading">
                <h3 id="prominds-fs-heading">Full Stack Developer</h3>
                <p>
                  <time dateTime={toIso(PROMINDS_FS_START)}>Nov 2025</time> —
                  Present · {promindsFs}
                </p>
                <ul itemProp="description">
                  <li>
                    Developed an automotive visitor-management SaaS used across
                    5 dealerships (5k+ monthly entries), with WhatsApp
                    automation and lead pipelines.
                  </li>
                  <li>
                    Managing the architectural shift and migration of legacy
                    infrastructure to a modern, streamlined CRM solution.
                  </li>
                </ul>
              </section>

              {/* WordPress Developer */}
              <section aria-labelledby="prominds-wp-heading">
                <h3 id="prominds-wp-heading">WordPress Developer</h3>
                <p>
                  <time dateTime={toIso(PROMINDS_WP_START)}>Apr 2025</time> —
                  Present · {promindsWp}
                </p>
                <ul itemProp="description">
                  <li>
                    Launched 5 WordPress sites and improved performance scores
                    by 50% — peak score 84.
                  </li>
                </ul>
              </section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

