import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Poiret_One, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { asset } from "@/lib/asset";
import {
  EMAIL,
  HOURS_BY_WEEKDAY,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SOCIALS,
} from "@/lib/constants";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Trackers } from "@/components/Trackers";

const poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poiret",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    images: [asset("/assets/images/card.jpg")],
  },
};

export const viewport: Viewport = {
  themeColor: "#1E1A16",
  colorScheme: "dark light",
};

/* ------------------------------------------------------------------ */
/* JSON-LD LocalBusiness (Chiropractor subtype). Real NAP and hours     */
/* only, computed from the same constants the UI renders.               */
/* ------------------------------------------------------------------ */

function toClock(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Group identical open ranges across weekdays into openingHoursSpecification. */
function openingHours() {
  const byRange = new Map<string, { opens: string; closes: string; days: string[] }>();
  for (const { day, ranges } of HOURS_BY_WEEKDAY) {
    for (const [start, end] of ranges) {
      const key = `${start}-${end}`;
      const entry = byRange.get(key) ?? {
        opens: toClock(start),
        closes: toClock(end),
        days: [],
      };
      entry.days.push(day);
      byRange.set(key, entry);
    }
  }
  return [...byRange.values()].map(({ opens, closes, days }) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  }));
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Chiropractor",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+18105847170",
  email: EMAIL,
  image: `${SITE_URL}/assets/images/card.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "8185 Holly Road Suite 14",
    addressLocality: "Grand Blanc",
    addressRegion: "MI",
    postalCode: "48439",
    addressCountry: "US",
  },
  openingHoursSpecification: openingHours(),
  sameAs: SOCIALS.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poiret.variable} ${sourceSerif.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Google tag + CallRail DNI. Loaded only in page loads that start
            outside patient-data routes (HIPAA; see components/Trackers.tsx). */}
        <Trackers />
      </body>
    </html>
  );
}
