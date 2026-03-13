import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TerraVolt - Agricultural & Energy Investment Platform",
  description: "Invest in sustainable agriculture, farmland, livestock, lithium energy, and commodity trading. High-yield investment opportunities with transparent returns.",
  keywords: ["agricultural investment", "farmland", "livestock", "lithium energy", "commodity trading", "sustainable agriculture", "investment platform", "high yield returns", "CFD trading"],
  authors: [{ name: "Teravolt Incorporated" }],
  creator: "Teravolt Incorporated",
  publisher: "Teravolt Incorporated",
  
  // Favicon and icons
  icons: {
    icon: [
      { url: "/icon.png", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/icon.png" },
    ],
    shortcut: "/icon.png",
  },
  
  // Additional metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.terravolt.com"),
  
  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://www.terravolt.com",
    siteName: "Terravolt",
    title: "TerraVolt - Agricultural & Energy Investment Platform",
    description: "Invest in sustainable agriculture, farmland, livestock, lithium energy, and commodity trading. High-yield investment opportunities with transparent returns.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://www.terravolt.com"}/social-preview.webp`,
        width: 1200,
        height: 630,
        alt: "TerraVolt - Agricultural & Energy Investment Platform",
        type: "image/png",
      },
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://www.terravolt.com"}/icon.png`,
        width: 512,
        height: 512,
        alt: "Terravolt Logo",
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    site: "@terravolt",
    creator: "@terravolt",
    title: "TerraVolt - Agricultural & Energy Investment Platform",
    description: "Invest in sustainable agriculture, farmland, livestock, lithium energy, and commodity trading. High-yield investment opportunities with transparent returns.",
    images: [`${process.env.NEXT_PUBLIC_APP_URL || "https://www.terravolt.com"}/social-preview.webp`],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  minimumScale: 1.0,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Terravolt" />
        
        {/* Smartsupp Live Chat script */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = 'a6493b49dec7cfe35b754e44a8ae811f3c822de0';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                c.type='text/javascript';c.charset='utf-8';c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
              })(document);
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <noscript>
          Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
        </noscript>
      </body>
    </html>
  );
}
