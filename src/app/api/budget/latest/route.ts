import { NextResponse } from 'next/server'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/db'
import { budgets } from '@/db/schema'


export async function GET() {
    const userId = 1


    const rows = await db
        .select()
        .from(budgets)
        .where(eq(budgets.userId, userId))
        .orderBy(desc(budgets.updatedAt))
        .limit(1)


    if (rows.length === 0) {
        return NextResponse.json({ budget: null })
    }


    return NextResponse.json({ budget: rows[0].rawJson })
}