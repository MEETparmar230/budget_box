import { NextResponse } from "next/server";
import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { monthYear, data, clientUpdatedAt } = await req.json();

    const userId = 1;
    const now = new Date();

    const existing = await db
      .select()
      .from(budgets)
      .where(and(eq(budgets.userId, userId), eq(budgets.month, monthYear)));

    if (existing.length === 0) {
      await db.insert(budgets).values({
        userId,
        month: monthYear,
        ...data,
        rawJson: data,
        updatedAt: now,
      });
    } else {
      const serverTime = new Date(existing[0].updatedAt).getTime();
      const clientTime = clientUpdatedAt
        ? new Date(clientUpdatedAt).getTime()
        : 0;

      if (clientTime >= serverTime) {
        await db
          .update(budgets)
          .set({
            ...data,
            rawJson: data,
            updatedAt: now,
          })
          .where(eq(budgets.id, existing[0].id));
      }
    }

    return NextResponse.json({
      success: true,
      syncedAt: now.toISOString(),
    });

  } catch (err) {
    console.error("Budget sync error", err);
    return NextResponse.json(
      { success: false, error: "Failed to sync budget" },
      { status: 500 }
    );
  }
}
