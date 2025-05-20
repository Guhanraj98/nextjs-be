import { NextResponse } from "next/server"
import connect from "@/lib/db";
import Profile from "@/lib/models/profile";

export const PUT = async ( request: Request, context: { params: { profile: string } }) =>{
    
    try {
        const user_id= context.params.profile;
        const body = await request.json();
        const { first_name, last_name, mobile_no}= body;
        await connect();

        const userExist = await Profile.findOne({user_id});

        if(!userExist){
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "User not found"
            }))
        }

        const updateProfileDetails : { [key: string]: string } = {};

        if(first_name){
            updateProfileDetails.first_name= first_name
        }
        if(last_name){
            updateProfileDetails.last_name= last_name
        }
        if(mobile_no){
            updateProfileDetails.mobile_no= mobile_no
        }

        const updateProfile = await Profile.findOneAndUpdate(
            {user_id: user_id},
            { ...updateProfileDetails },
            {new: true})

        return new NextResponse(JSON.stringify({
            status: 1,
            message: "Profile updated successfully",
            data: updateProfile
        }))

    }catch (err: any) {
        return new NextResponse("Error in updating profile: " + err.message, {
            status: 500,
        });
    }
}