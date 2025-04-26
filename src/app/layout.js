import { IBM_Plex_Sans } from "next/font/google";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import "@/styles/typography.css";
import Navbar from "@/components/Navbar";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata = {
  title: {
    default: "GridLeaf API Documentation",
    template: "%s | GridLeaf API Documentation"
  },
  description: "Modern developer tools for grid planning and resiliency. Comprehensive API documentation and guides for GridLeaf's powerful grid management solutions.",
  keywords: ["grid planning", "resiliency", "API documentation", "developer tools", "grid management"],
  authors: [{ name: "GridLeaf Team" }],
  creator: "GridLeaf",
  publisher: "GridLeaf",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dev.gridleaf.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "GridLeaf API Documentation",
    description: "Modern developer tools for grid planning and resiliency",
    url: 'https://dev.gridleaf.org',
    siteName: 'GridLeaf API Documentation',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GridLeaf API Documentation",
    description: "Modern developer tools for grid planning and resiliency",
    creator: '@gridleaf_',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${firaCode.variable} dark`}>
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
