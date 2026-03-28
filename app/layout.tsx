import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Fitness Zone Gym | Forge Your Finest Self",
  description:
    "Expert coaching and premium facilities tailored for those who demand more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${lexend.variable}`}>
      <body
        id="top"
        className="bg-background-light dark:bg-background-dark text-white font-display overflow-x-hidden antialiased"
      >
        {children}
      </body>
    </html>
  );
}
