import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ProfileSchema = new Schema (
    {
        id: { type: "string", unique: true, default: uuidv4  },
        user_id: { type: "string", unique: true },
        first_name: { type: "string", required: true, unique: true},
        last_name: { type: "string", required: true, unique: true },
        mobile_no: { type: "string", required: true, unique: true}
    },
    {
        timestamps: true
    }
)

const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;