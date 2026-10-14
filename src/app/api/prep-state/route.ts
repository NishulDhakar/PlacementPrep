import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
import PrepState from "@/models/PrepState";

async function getUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id || null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    await connectToDb();
    const state = await PrepState.findOne({ userId }).lean();
    return NextResponse.json({
      profile: state?.profile ?? null,
      mockHistory: state?.mockHistory ?? [],
    });
  } catch (error) {
    console.error("Prep state load error", error);
    return NextResponse.json({ error: "Unable to load prep state" }, { status: 503 });
  }
}

export async function PUT(request: NextRequest) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.profile !== undefined) {
      if (!body.profile || typeof body.profile !== "object" || Array.isArray(body.profile)) {
        return NextResponse.json({ error: "Invalid profile" }, { status: 400 });
      }
      updates.profile = body.profile;
    }

    if (body.mockResult !== undefined) {
      const { score, total, date } = body.mockResult;
      if (
        !Number.isInteger(score) ||
        !Number.isInteger(total) ||
        score < 0 ||
        total < 1 ||
        score > total ||
        typeof date !== "string" ||
        Number.isNaN(Date.parse(date))
      ) {
        return NextResponse.json({ error: "Invalid mock result" }, { status: 400 });
      }
      updates.mockResult = { score, total, date };
    }

    if (body.mockHistory !== undefined) {
      if (
        !Array.isArray(body.mockHistory) ||
        body.mockHistory.length > 5 ||
        body.mockHistory.some((result) =>
          !Number.isInteger(result.score) ||
          !Number.isInteger(result.total) ||
          result.score < 0 ||
          result.total < 1 ||
          result.score > result.total ||
          typeof result.date !== "string" ||
          Number.isNaN(Date.parse(result.date))
        )
      ) {
        return NextResponse.json({ error: "Invalid mock history" }, { status: 400 });
      }
      updates.mockHistory = body.mockHistory;
    }

    if (!Object.keys(updates).length) {
      return NextResponse.json({ error: "No prep state provided" }, { status: 400 });
    }

    await connectToDb();
    const update: Record<string, unknown> = {};
    if (updates.profile !== undefined) {
      update.$set = { profile: updates.profile };
    }
    if (updates.mockResult !== undefined) {
      update.$push = { mockHistory: { $each: [updates.mockResult], $slice: -5 } };
    }
    if (updates.mockHistory !== undefined) {
      update.$set = { ...((update.$set as Record<string, unknown> | undefined) ?? {}), mockHistory: updates.mockHistory };
    }

    await PrepState.findOneAndUpdate({ userId }, update, { upsert: true, new: true, runValidators: true });
    return NextResponse.json({ saved: true });
  } catch (error) {
    console.error("Prep state save error", error);
    return NextResponse.json({ error: "Unable to save prep state" }, { status: 503 });
  }
}