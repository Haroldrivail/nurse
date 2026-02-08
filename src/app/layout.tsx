import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import BackToTop from "@/components/back-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    siteName: "Nurse Hilfe Menschen Internationale",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-base-100 text-base-content`}
      >
        <ThemeProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
