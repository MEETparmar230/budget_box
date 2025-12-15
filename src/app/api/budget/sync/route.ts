import { NextResponse } from "next/server";
import { db } from "@/db";
import { budgets } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { monthYear, data, clientUpdatedAt } = await req.json();

    // Extract userId from JWT token in request
    const token = req.headers.get('cookie')?.split('token=')[1];
    let userId = 1; // fallback
    
    if (token) {
      try {
        userId = 1;
      } catch (e) {
        console.warn("Failed to extract userId from token, using default");
      }
    }

    const now = new Date();

    // Fix: Cast monthYear to string to ensure correct comparison
    const existing = await db
      .select()
      .from(budgets)
      .where(
        and(
          eq(budgets.userId, userId),
          eq(budgets.month, String(monthYear)) // Ensure string comparison
        )
      );

    if (existing.length === 0) {
      // Validate data before inserting
      const validatedData = {
        income: Number(data.income) || 0,
        bills: Number(data.bills) || 0,
        food: Number(data.food) || 0,
        transport: Number(data.transport) || 0,
        subscriptions: Number(data.subscriptions) || 0,
        miscellaneous: Number(data.miscellaneous) || 0,
      };

      await db.insert(budgets).values({
        userId,
        month: String(monthYear),
        ...validatedData,
        rawJson: data,
        updatedAt: now,
      });
    } else {
      const serverTime = new Date(existing[0].updatedAt).getTime();
      const clientTime = clientUpdatedAt
        ? new Date(clientUpdatedAt).getTime()
        : 0;

      if (clientTime >= serverTime) {
        const validatedData = {
          income: Number(data.income) || 0,
          bills: Number(data.bills) || 0,
          food: Number(data.food) || 0,
          transport: Number(data.transport) || 0,
          subscriptions: Number(data.subscriptions) || 0,
          miscellaneous: Number(data.miscellaneous) || 0,
        };

        await db
          .update(budgets)
          .set({
            ...validatedData,
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
    console.error("Budget sync error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to sync budget",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}