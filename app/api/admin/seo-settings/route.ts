import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SEOSettings from '@/models/SEOSettings';

export async function GET() {
  await dbConnect();
  let settings = await SEOSettings.findOne();
  if (!settings) {
    settings = await SEOSettings.create({});
  }
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  let settings = await SEOSettings.findOne();
  if (!settings) {
    settings = await SEOSettings.create(data);
  } else {
    Object.assign(settings, data);
    await settings.save();
  }
  return NextResponse.json(settings);
}
