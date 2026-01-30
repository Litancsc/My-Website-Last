import { NextResponse } from 'next/server';

function getSiteUrl(): string {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    return url.origin.replace(/\/$/, '');
  } catch {
    return 'http://localhost:3000';
  }
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const now = new Date().toISOString();

  const urls = [
    { url: `${siteUrl}/`, lastModified: now },
    { url: `${siteUrl}/blog`, lastModified: now },
    { url: `${siteUrl}/about`, lastModified: now },
    { url: `${siteUrl}/contact`, lastModified: now },
    { url: `${siteUrl}/cars`, lastModified: now },
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls
      .map(
        ({ url, lastModified }) =>
          `<url><loc>${url}</loc><lastmod>${lastModified}</lastmod></url>`
      )
      .join('') +
    `</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
