import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elegant Surfaces",
  description: "Discover Your Perfect Aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        
        <ToasterProvider />
        
        
        <Navbar />
        
        <main className="min-h-screen" suppressHydrationWarning>
          {children}
        </main>
        
        <div suppressHydrationWarning>
          <Footer />
        </div>

      </body>
    </html>
  );
}