import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://nurseinternationale.com";
const ORG_NAME = "Nurse Hilfe Menschen Internationale";
const ORG_LOGO = `${SITE_URL}/images/logo-complet.png`;
const ORG_EMAIL = process.env.NEXT_PUBLIC_ORG_EMAIL || "";
const ORG_PHONE = process.env.NEXT_PUBLIC_ORG_PHONE || "";
const ORG_SOCIALS = (process.env.NEXT_PUBLIC_ORG_SOCIALS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
const ORG_ADDRESS = {
  streetAddress: process.env.NEXT_PUBLIC_ORG_ADDRESS_STREET || "",
  addressLocality: process.env.NEXT_PUBLIC_ORG_ADDRESS_CITY || "",
  postalCode: process.env.NEXT_PUBLIC_ORG_ADDRESS_POSTAL || "",
  addressCountry: process.env.NEXT_PUBLIC_ORG_ADDRESS_COUNTRY || "",
};

export const metadata: Metadata = {
  title: {
    default: "Nurse Hilfe Menschen Internationale",
    template: "%s | NHMI",
  },
  description:
    "Fondation humanitaire dédiée aux soins, à la dignité et au soutien des communautés vulnérables.",
  metadataBase: new URL("https://nurseinternationale.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: ORG_NAME,
    images: [
      {
        url: ORG_LOGO,
        width: 1200,
        height: 630,
        alt: ORG_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ORG_NAME,
    description:
      "Fondation humanitaire dédiée aux soins, à la dignité et au soutien des communautés vulnérables.",
    images: [ORG_LOGO],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        (function() {
          try {
            var theme = localStorage.getItem('theme');
            if(theme) {
              document.documentElement.setAttribute('data-theme', theme);
            }
          } catch(e){}
        })();
      `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: ORG_NAME,
              url: SITE_URL,
              logo: ORG_LOGO,
              ...(ORG_SOCIALS.length ? { sameAs: ORG_SOCIALS } : {}),
              ...(ORG_ADDRESS.streetAddress ||
              ORG_ADDRESS.addressLocality ||
              ORG_ADDRESS.postalCode ||
              ORG_ADDRESS.addressCountry
                ? {
                    address: {
                      "@type": "PostalAddress",
                      ...ORG_ADDRESS,
                    },
                  }
                : {}),
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  ...(ORG_EMAIL ? { email: ORG_EMAIL } : {}),
                  ...(ORG_PHONE ? { telephone: ORG_PHONE } : {}),
                  availableLanguage: ["fr", "en", "de"],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base-100 text-base-content`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
