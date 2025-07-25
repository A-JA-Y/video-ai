import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request:NextRequest){
    try {
        const { email, password } = await request.json()
        if(!email || !password){
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        await User.create({
            email,
            password

        })

        return NextResponse.json({ error: "User registered succesfully!" }, { status: 400 });


        

        await connectToDatabase()

        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({ error: "user already exists" }, { status: 400 });

        }
    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({ error: "An error occurred while registering the user" }, { status: 500 });
    }
}