import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Car from '@/models/Car';
import BlogPost from '@/models/BlogPost';
import { getSiteUrl } from '@/lib/site';

export async function GET() {
  try {
    await dbConnect();

    const baseUrl = getSiteUrl();
    const currentDate = new Date().toISOString();
    
    // Static pages
    const staticPages = [
      { url: '', changefreq: 'daily', priority: 1.0 },
      { url: '/cars', changefreq: 'daily', priority: 0.9 },
      { url: '/about', changefreq: 'monthly', priority: 0.7 },
      { url: '/blog', changefreq: 'daily', priority: 0.8 },
      { url: '/contact', changefreq: 'monthly', priority: 0.7 },
      { url: '/notifications', changefreq: 'weekly', priority: 0.6 },
    ];
    
    // Get cars
    const cars = await Car.find({ available: true }).select('slug updatedAt').lean();
    
    // Get blog posts
    const posts = await BlogPost.find({ published: true }).select('slug updatedAt').lean();
    
    // Build sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${cars.map((car: any) => `
  <url>
    <loc>${baseUrl}/cars/${car.slug}</loc>
    <lastmod>${car.updatedAt || currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  ${posts.map((post: any) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`;
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error: any) {
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
