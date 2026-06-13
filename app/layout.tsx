import type { Metadata } from "next";
import { Space_Grotesk, Lexend } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduSimply - Personalised Science & Mathematics Tutoring",
  description:
    "At EduSimply, learning is made clear, supportive, and simple. Founded by Miss Pudamini Onethra Gomes, offering personalised tutoring across science and mathematics for primary, high school, university, and adult learners.",
  keywords:
    "EduSimply, Pudamini Onethra Gomes, Science Tutoring, WACE ATAR Biology, Chemistry, Physics, Human Biology, University Science, Online Tutoring",
  openGraph: {
    title: "EduSimply — Where Learning Feels Simple",
    description:
      "At EduSimply, learning is made clear, supportive, and simple. Founded by Miss Pudamini Onethra Gomes, offering personalised tutoring across science and mathematics.",
    url: "https://edusimply",
    siteName: "EduSimply",
    locale: "en_AU",
    type: "website",
  },
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
    name: "EduSimply Personalised Tutoring",
    description:
      "Personalised tutoring across a wide range of science subjects, including Biology, Chemistry, Physics, Human Biology, General Science, Anatomy and Physiology, and Biochemistry.",
    organizer: {
      "@type": "Person",
      name: "Miss Pudamini Onethra Gomes",
      jobTitle: "Tutor",
      url: "https://edusimply",
    },
    coursePrerequisites: "Primary, High School, University, and Adult Learners",
    about: [
      "Biology",
      "Chemistry",
      "Physics",
      "Human Biology",
      "General Science",
      "Anatomy and Physiology",
      "Biochemistry",
      "Mathematics",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${lexend.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-background text-on-background font-body-md overflow-x-hidden relative grid-bg min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
