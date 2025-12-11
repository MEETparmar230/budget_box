// app/api/auth/login/route.ts
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs';


export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const client = await pool.connect();
        try {
            const q = 'SELECT id, email, password_hash FROM users WHERE email=$1 LIMIT 1';
            const res = await client.query(q, [email]);
            if (res.rowCount === 0) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
            const user = res.rows[0];
            const valid = await bcrypt.compare(password, user.password_hash);
            if (!valid) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
            // NOTE: For demo purposes we return a simple token-like object. In prod, set secure httpOnly cookie/session.
            return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
        } finally { client.release() }
    } catch (e) {
        return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
    }
}