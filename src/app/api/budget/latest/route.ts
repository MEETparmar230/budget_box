import { NextResponse } from 'next/server'
import pool from '@/lib/db'


export async function GET(req: Request) {
    try {
        const userId = 1; // demo
        const client = await pool.connect();
        try {
            const q = 'SELECT data, updated_at FROM budgets WHERE user_id=$1 ORDER BY updated_at DESC LIMIT 1';
            const res = await client.query(q, [userId]);
            if (res.rowCount === 0) return NextResponse.json({ data: null });
            return NextResponse.json({ data: res.rows[0].data, updatedAt: res.rows[0].updated_at });
        } finally { client.release() }
    } catch (e) {
        return NextResponse.json({ success: false, error: String(e) }, { status: 500 })
    }
}