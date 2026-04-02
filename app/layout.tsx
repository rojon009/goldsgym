import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Gold's GYM | Forge Your Finest Self",
  description:
    "Expert coaching and premium facilities tailored for those who demand more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable}`}>
      <body
        id="top"
        className="bg-background-light dark:bg-background-dark text-slate-100 font-display overflow-x-hidden antialiased selection:bg-primary/35 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
