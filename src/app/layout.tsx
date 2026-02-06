import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  title: "Nurse Hilfe Menschen Internationale",
  description:
    "Fondation humanitaire dédiée aux soins, à la dignité et au soutien des communautés vulnérables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning data-lt-installed>
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <main
            id="main-content"
            className="min-h-screen bg-white text-slate-900"
          >
              {children}
          </main>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
