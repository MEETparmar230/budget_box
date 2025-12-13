import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import {users} from '@/db/schema'
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export async function POST(req: NextRequest){

    const body = await req.json()
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({message:"Email and password are required"}, { status: 400 });
    }

    const user = await db.query.users.findFirst({
        where:eq(users.email, email)
    })

    if (!user) {
        return NextResponse.json({message:"Invalid credentials"}, { status: 404 });
    }

console.log(await bcrypt.hash(password,10));
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return NextResponse.json({message:"Invalid credentials"}, { status: 401 });
    }

    const token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,{expiresIn:'7d'});

    

    const res = NextResponse.json({message:"Login successful"}, { status: 200 })

    res.cookies.set("token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    })

    return res;


}