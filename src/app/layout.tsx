import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://powerfitzone.com"),
  title: "Power Fitness Zone — Elite Gym & Strength Performance Center",
  description:
    "Transform your physique and mindset at Power Fitness Zone. Elite trainers, Olympic lifting platforms, Finnish sauna, and results-driven training. Claim your free 1-day trial pass today.",
  keywords: [
    "Power Fitness Zone",
    "gym lahore",
    "strength training",
    "crossfit",
    "personal training",
    "boxing gym",
    "HIIT workouts",
    "bodybuilding gym",
  ],
  openGraph: {
    title: "Power Fitness Zone — Elite Gym & Strength Performance Center",
    description:
      "Transform your physique and mindset at Power Fitness Zone. Elite certified trainers, Olympic platforms, Finnish sauna, and results-driven community.",
    type: "website",
    locale: "en_PK",
    siteName: "Power Fitness Zone",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Power Fitness Zone — Unleash Your Full Potential",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Fitness Zone — Elite Gym & Strength Performance Center",
    description:
      "Transform your physique and mindset at Power Fitness Zone. Claim your free 1-day pass today.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ExerciseGym",
              "@id": "https://powerfitzone.com",
              name: "Power Fitness Zone",
              description:
                "Premier fitness and strength conditioning center with expert trainers, Olympic equipment, sauna suites, and customized nutrition coaching.",
              image: "/images/og-image.jpg",
              telephone: "+92-300-1234567",
              currenciesAccepted: "PKR",
              paymentAccepted: "Cash, Credit Card, Bank Transfer, JazzCash, EasyPaisa",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Main Boulevard, Model Town & DHA Phase 5",
                addressLocality: "Lahore",
                addressRegion: "Punjab",
                postalCode: "54000",
                addressCountry: "PK",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 31.5204,
                longitude: 74.3587,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ],
                  opens: "06:00",
                  closes: "23:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "08:00",
                  closes: "20:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "248",
              },
              priceRange: "PKR 8,000 – PKR 25,000/month",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-brand-white text-brand-black font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-red focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
