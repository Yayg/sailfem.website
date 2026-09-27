import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sail-Fem · Capitainerie Viking",
  description:
    "Sail-Fem, capitainerie parisienne d'Einherjar Elag — association de reconstitution historique Viking basée à Brunoy. Combat, artisanat, campement et vie viking.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-parchment font-body">
        {children}
      </body>
    </html>
  );
}
