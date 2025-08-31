import type { Metadata } from "next";
import { Orbitron, Exo_2, Audiowide, Fira_Code, Major_Mono_Display, Electrolize, Michroma, Bungee, Rajdhani } from "next/font/google";
import "./globals.css";

// Primary display font - futuristic, space-themed
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

// Secondary body font - modern, clean, readable
const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  display: "swap",
});

// Accent font - tech/gaming aesthetic
const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Mono font - developer-friendly with ligatures
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

// Unique futuristic fonts
const majorMono = Major_Mono_Display({
  variable: "--font-major-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const electrolize = Electrolize({
  variable: "--font-electrolize",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PEC HACKS 3.0",
  description: "Created by Alphamoris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${orbitron.variable} ${exo2.variable} ${audiowide.variable} ${firaCode.variable} ${majorMono.variable} ${electrolize.variable} ${michroma.variable} ${bungee.variable} ${rajdhani.variable}`}
    >
      <body className="antialiased font-exo bg-black text-white">
        {children}
      </body>
    </html>
  );
}
