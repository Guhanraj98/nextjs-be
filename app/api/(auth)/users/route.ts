import { NextResponse } from "next/server"
import connect from "@/lib/db"
import User from "@/lib/models/users"
import bcrypt from "bcryptjs";

export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200 })
    } catch (err: any) {
        return new NextResponse("Error in retrieving users" + err.message, {
            status: 500
        })
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const hashedPassword = await bcrypt.hash(body.password, 10);

        await connect();
        const userData = new User({
            ...body,
            password: hashedPassword,
        });
        await userData.save();

        return new NextResponse(JSON.stringify({
            message: "User created successfully!",
            user: {
                id: userData.id,
                email: userData.email,
                createdAt: userData.createdAt
            }
        }), { status: 200 })
    } catch (err: any) {
        return new NextResponse("Error in adding user" + err.message, {
            status: 500
        })
    }
}

