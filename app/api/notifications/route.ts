import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Notification from '@/models/Notification';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const query: Record<string, unknown> = {};

    if (active === 'true') {
      const now = new Date();

      query.active = true;
      query.startDate = { $lte: now };
      query.$or = [
        { endDate: { $exists: false } },
        { endDate: null },
        { endDate: { $gte: now } },
      ];
    }

    const notifications = await Notification.find(query).sort({
      priority: -1,
      createdAt: -1,
    });

    return NextResponse.json(notifications);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
  
}
