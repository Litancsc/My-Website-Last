// app/layout.tsx
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { generateLocalBusinessSchema } from '@/lib/seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Rupali Travel Agency In Shillong';
const siteDescription = 'Reliable car rental service in Shillong. Book affordable taxis, cabs, and luxury cars for airport transfers, sightseeing, and outstation trips. 24/7 service with professional drivers. Call 8415038275 for instant booking.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Premium Car Rental Service`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'car rental shillong ', 
    'taxi service shillong ', 
'cab booking shillong',
 'car hire shillong',
 'rent a car shillong',
'luxury car rental shillong',
 'affordable car rental shillong',
 'airport taxi shillong',
 'outstation cab shillong',
 'shillong car rental service',
'vehicle rental shillong', 
'premium car hire shillong', 
'local cab shillong',
 'tourist taxi shillong' ,

  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} - Premium Car Rental Service`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Premium Car Rental Service`,
    description: siteDescription,
    images: [`${siteUrl}/images/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: { google: 'your-google-verification-code' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
