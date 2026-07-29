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
  title: "360 Fitness — Premium Gym & Training Facility",
  description:
    "Transform your body and mindset at 360 Fitness. Expert trainers, world-class equipment, and a community that pushes you to be your best. Claim your free trial class today.",
  keywords: [
    "gym",
    "fitness",
    "personal training",
    "boxing",
    "HIIT",
    "strength training",
    "360 Fitness",
  ],
  openGraph: {
    title: "360 Fitness — Premium Gym & Training Facility",
    description:
      "Transform your body and mindset at 360 Fitness. Expert trainers, world-class equipment, and a community that pushes you to be your best.",
    type: "website",
    locale: "en_US",
    siteName: "360 Fitness",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "360 Fitness — Train Like It Matters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "360 Fitness — Premium Gym & Training Facility",
    description:
      "Transform your body and mindset at 360 Fitness. Claim your free trial class today.",
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
              "@type": "LocalBusiness",
              "@id": "https://powerfitzone.com",
              name: "360 Fitness",
              description:
                "Premium gym and training facility with expert trainers, world-class equipment, and results-driven programs.",
              image: "/images/og-image.jpg",
              telephone: "+92-300-1234567",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Fitness Boulevard, Block C",
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
                  ],
                  opens: "05:00",
                  closes: "23:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "06:00",
                  closes: "22:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday"],
                  opens: "07:00",
                  closes: "20:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "230",
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
