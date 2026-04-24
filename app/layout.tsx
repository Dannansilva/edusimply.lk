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
  title: 'edusimply.lk - The Cinematic Frontier of Digital Education',
  description: 'Experience a cinematic approach to education. High-tech, immersive learning environments designed for the modern student aiming for academic excellence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${lexend.variable} h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="bg-background text-on-background font-body-md overflow-x-hidden relative grid-bg min-h-full flex flex-col">{children}</body>
    </html>
  );
}
