import { NextResponse } from "next/server"
import connect from "@/lib/db";
import Location from "@/lib/models/locations";


export const GET = async (request: Request, context: { params: { location: String } }) => {
    try {
        const user_id = context.params.location;
        console.log(user_id, 'frm api ');
        await connect();

        const getLocationByID = await Location.findOne({ user_id });

        if (!getLocationByID) {
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "Location not found for the user id provided!"
            }), { status: 400 })
        }

        return new NextResponse(JSON.stringify({
            status: 1,
            data: getLocationByID
        }), { status: 200 })

    } catch (err: any) {
        return new NextResponse("Error in getting location by id: " + err.message, {
            status: 500,
        });
    }
}

export const PUT = async (request: Request, context: { params: { location: String } }) => {
    try {
        const user_id= context.params.location;
        const body = await request.json();
        const {address_line_1, address_line_2, state, city, post_code}= body;
        const locationUserExist = await Location.findOne({user_id});
        if(!locationUserExist){
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "Location with user id does not found!"
            }), {status: 400})
        }

        const updateLocationDetails : { [key: string]: string } = {};
        if(address_line_1){
            updateLocationDetails.address_line_1= address_line_1
        }
        if(address_line_2){
            updateLocationDetails.address_line_2= address_line_2
        }
        if(state){
            updateLocationDetails.state= state
        }
        if(city){
            updateLocationDetails.city= city
        }
        if(post_code){
            updateLocationDetails.post_code= post_code
        }

        const updateLocation = await Location.findOneAndUpdate(
            {user_id},
            {...updateLocationDetails},
            {new: true}
        );

        return new NextResponse(JSON.stringify({
            status: 1,
            message: "Location successfully updated!",
            data: {
                user_id: updateLocation.user_id,
                address_line_1: updateLocation.address_line_1,
                address_line_2: updateLocation.address_line_2,
                state: updateLocation.state,
                city: updateLocation.city,
                post_code: updateLocation.post_code
            }
        }), {status: 200})


    } catch (err: any) {
        return new NextResponse("Error in updating location by id: " + err.message, {
            status: 500,
        });
    }
}

export const DELETE = async (request: Request, context: { params: { location: String } }) =>{
    try{
        const user_id= context.params.location;

        await connect();
        
        const userLocation = await Location.findOne({user_id});

        if(!userLocation){
            return new NextResponse(JSON.stringify({
                status: 0,
                message: "Location with expecetd user id is not found!"
            }))
        }

        await Location.deleteOne({ user_id });

        return new NextResponse(JSON.stringify({
            status: 1,
            message: "Location deleted successfully!"
        }))
    }catch (err: any){
        return new NextResponse("Error in deleting location by id: " + err.message, {
            status: 500,
        });
    }
}