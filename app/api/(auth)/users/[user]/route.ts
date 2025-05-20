import { NextResponse } from "next/server"
import connect from "@/lib/db"
import User from "@/lib/models/users"
import bcrypt from "bcryptjs";


export const PUT = async (
    request: Request, 
    context: { params: { user: string } }
  ) => {
    try {
      const userId = context.params.user;
  
      const body = await request.json();
      const { email } = body;
  
      await connect();
  
      // Check if user with custom UUID exists
      const existingUser = await User.findOne({ id: userId });
      if (!existingUser) {
        return new NextResponse(
          JSON.stringify({ message: "User not found" }),
          { status: 404 }
        );
      }
  
      // Update user using custom id (not Mongo _id)
      const updatedUser = await User.findOneAndUpdate(
        { id: userId },
        { email },
        { new: true }
      );
  
      return new NextResponse(
        JSON.stringify({
          message: "Details updated successfully",
          data: {
            id: updatedUser.id,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
          },
        }),
        { status: 200 }
      );
    } catch (err: any) {
      return new NextResponse("Error in updating user: " + err.message, {
        status: 500,
      });
    }
  };