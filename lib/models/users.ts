import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new Schema(
    {
        id: { type: "string", unique: true, default: uuidv4  },
        email: { type: "string", required: true, unique: true},
        password: { type: "string", required: true}
    },
    {
        timestamps: true
    }
)

const User= models.User || model("User", UserSchema);

export default User;
