import type { Metadata } from 'next';
import { Space_Grotesk, Lexend } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const lexend = Lexend({
  variable: '--font-lexend',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EduSimply - Mathematics & Science Tuition Sri Lanka | Grade 6-11 & O/L',
  description: 'Learn Mathematics and Science from the best. Premium, interactive educational platform for Grade 6-11 and O/L students in Sri Lanka. Apple-quality learning experiences.',
  keywords: 'Science Teacher Sri Lanka, Mathematics Teacher Sri Lanka, O/L Science Classes, O/L Maths Classes, Online Science Classes, Online Mathematics Classes, EduSimply.lk',
  openGraph: {
    title: 'EduSimply - Making Science & Mathematics Simple',
    description: 'Learn Mathematics and Science from the best. Premium, interactive educational platform for Grade 6-11 and O/L students in Sri Lanka.',
    url: 'https://edusimply.lk',
    siteName: 'EduSimply',
    locale: 'en_LK',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data Schema
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": "EduSimply Mathematics & Science Classes",
    "description": "Premium educational tutoring classes for Grade 6-11 and O/L students in Sri Lanka.",
    "organizer": {
      "@type": "Organization",
      "name": "EduSimply",
      "url": "https://edusimply.lk"
    },
    "coursePrerequisites": "Grade 6-11 Students",
    "educationalLevel": "Secondary Education (O/L)",
    "about": ["Mathematics", "Science"]
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${lexend.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-background text-on-background font-body-md overflow-x-hidden relative grid-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
