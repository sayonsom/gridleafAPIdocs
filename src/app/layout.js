import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "GridLeaf API Documentation",
  description: "Modern developer tools for grid planning and resiliency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased font-sans min-h-screen bg-transparent relative text-gray-100">
        <div className="fixed inset-0 bg-[#000000]" />
        <div className="fixed inset-0">
          <div className="absolute bottom-0 left-0 right-0 h-[90vh] bg-gradient-to-t from-green-800/40 via-green-900/20 to-transparent" />
          <div className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 w-[70vw] h-[80vh] bg-gradient-radial from-green-700/30 via-green-800/20 to-transparent blur-3xl" />
          <div className="absolute bottom-[30vh] left-1/2 -translate-x-1/2 w-[50vw] h-[60vh] bg-gradient-radial from-green-600/20 via-green-800/10 to-transparent blur-2xl" />
        </div>
        <div className="relative z-10">
          <Navbar />
          <main className="pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
