import { Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const LocationSchema = new Schema(
    {
        id: { type: "string", unique: true, default: uuidv4  },
        user_id: { type: String, required: true },
        address_line_1: { type: String, required: true },
        address_line_2: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        post_code: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

const Location= models.Location || model("Location", LocationSchema);

export default Location;
