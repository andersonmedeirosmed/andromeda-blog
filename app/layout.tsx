import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const SITE_URL = "https://blog.andromedalms.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Andromeda LMS Blog — Educação médica online",
    template: "%s | Andromeda LMS Blog",
  },
  description:
    "Artigos sobre educação médica online, criação de cursos, estratégias de ensino e tecnologia para professores e instituições de saúde.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Andromeda LMS Blog",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Andromeda LMS Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andromeda LMS Blog",
    description:
      "Artigos sobre educação médica online, criação de cursos e tecnologia para professores.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Andromeda LMS",
  url: "https://www.andromedalms.com",
  logo: "https://www.andromedalms.com/og-image.png",
  description:
    "Plataforma LMS para criação de escolas médicas online com sua marca.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Andromeda LMS Blog",
  url: SITE_URL,
  description:
    "Artigos sobre educação médica online e criação de cursos para professores e instituições de saúde.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
