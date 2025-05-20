import { NextResponse } from "next/server"
import connect from "@/lib/db";
import Profile from "@/lib/models/profile";

export const GET = async () => {
    try {
        await connect;

        const profile= await Profile.find();

        return new NextResponse(JSON.stringify({
            message: "Successfully retrieved profiles!",
            data: profile
        }), { status: 200})

    } catch (err: any) {
        return new NextResponse("Error in getting profile: " + err.message, {
            status: 500,
        });
    }
}

export const POST = async (request: Request) =>{
    try{
        const body = await request.json();
        const {id,  first_name, last_name, mobile_no}= body;

        await connect();

        if(!id) {
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "User id is required!",
            }))
        }
        else if( !first_name){
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "First Name is required!",
            }))
        }

        else if( !last_name){
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "Last name is required!",
            }))
        }
        else if( !mobile_no){
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "Mobile no is required!",
            }))
        }
        const createProfile = new Profile ({
            user_id: id,
            first_name: first_name,
            last_name: last_name,
            mobile_no: mobile_no
        })

        await createProfile.save();

        return new NextResponse(JSON.stringify({
            status: 1,
            message: "Profile successfully created!",
            data: createProfile
        }), {status: 200})

    } catch (err: any) {
        return new NextResponse("Error in creating profile: " + err.message, {
            status: 500,
        });
    }
}

