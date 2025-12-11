import { NextResponse } from 'next/server'
import pool from '@/lib/db'


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userId = 1; // demo
        const { monthYear, data } = body;
        const now = new Date().toISOString();
        const client = await pool.connect();
        try {
            const q = `INSERT INTO budgets (user_id, month_year, data, updated_at)
VALUES ($1,$2,$3::jsonb,$4)
ON CONFLICT (user_id, month_year) DO UPDATE SET data=EXCLUDED.data, updated_at=EXCLUDED.updated_at RETURNING updated_at`;
            const res = await client.query(q, [userId, monthYear, JSON.stringify(data), now]);
            return NextResponse.json({ success: true, timestamp: res.rows[0].updated_at });
        } finally { client.release() }
    } catch (e) {
        return NextResponse.json({ success: false, error: String(e) }, { status: 500 })
    }
}