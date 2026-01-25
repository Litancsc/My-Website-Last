// lib/seo.ts

function getSiteUrl(): string {
  try {
    // ✅ ensures valid absolute URL (fixes canonical warnings)
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').origin;
  } catch {
    return 'http://localhost:3000';
  }
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
}

export function generateMetadata(seo: SEOData) {
  const siteUrl = getSiteUrl();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Rupali travel agency in Shillong';

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    robots: seo.noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: seo.canonical || siteUrl, // ✅ canonical now absolute and valid
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical || siteUrl,
      siteName,
      images: [
        {
          url: seo.ogImage || `${siteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
      locale: 'en_US',
      type: seo.ogType || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || `${siteUrl}/images/og-image.jpg`],
    },
  };
}

// ✅ Car Schema
export function generateCarSchema(car: any) {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: car.name,
    description: car.description,
    brand: { '@type': 'Brand', name: car.brand },
    model: car.model,
    image: car.mainImage,
    offers: {
      '@type': 'Offer',
      price: car.pricePerDay,
      priceCurrency: 'USD',
      availability: car.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/cars/${car.slug}`,
    },
  };
}

// ✅ Local Business Schema
export function generateLocalBusinessSchema() {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Rupali travel agency in Shillong',
    description: 'Taxi & Premium Car Rental Service - Affordable & Luxury Cars',
    url: siteUrl,
    telephone: '+91 8415038275',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Milan Compound, Upper Mawprem',
      addressLocality: 'Shillong, Meghalaya',
      addressRegion: 'NE',
      postalCode: '793002',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '25.579163388589937',
      longitude: '91.87035668078006',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/people/Rupali-Travel-Agency-in-Shillong/61581926342128/',
      'https://www.instagram.com/',
      'https://twitter.com/',
    ],
  };
}

// ✅ Breadcrumb Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
