import { NextResponse } from "next/server"
import connect from "@/lib/db";
import Location from "@/lib/models/locations";

export const GET = async () => {
    try {
        await connect();

        const locations = await Location.find();

        return new NextResponse(JSON.stringify({
            status: 1,
            data: locations,

        }), { status: 200 })
    } catch (err: any) {
        return new NextResponse("Error in getting location: " + err.message, {
            status: 500,
        });
    }
}

export const POST = async (request: Request) => {
    try {
        const body= await request.json();
        const {user_id, address_line_1, address_line_2, state, city, post_code}= body;

        const requiredFields = [
            { key: "user_id", label: "User Id" },
            { key: "address_line_1", label: "Address Line 1" },
            { key: "address_line_2", label: "Address Line 2" },
            { key: "state", label: "State" },
            { key: "city", label: "City" },
            { key: "post_code", label: "Post Code" }
        ];

        for (const field of requiredFields) {
            if (!body[field.key]) {
                return new NextResponse(JSON.stringify({
                    status: 0,
                    message: `${field.label} is required`
                }));
            }
        }

        const addLocation = new Location ({
            user_id: user_id,
            address_line_1: address_line_1,
            address_line_2: address_line_2,
            state: state,
            city: city,
            post_code: post_code
        });

        await addLocation.save();

        return new NextResponse(JSON.stringify({
            status: 1,
            message: "Address details successfully added!",
            data: addLocation
        }), {status: 200})

    } catch (err: any) {
        return new NextResponse("Error in getting location: " + err.message, {
            status: 500,
        });
    }
}