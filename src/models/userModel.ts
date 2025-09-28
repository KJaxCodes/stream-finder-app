import { Schema, Document, model, models, Model } from "mongoose";
//validator package to validate email
import { isEmail } from "validator";

export interface IUser extends Document {
    email: string;
    password: string;
    watchlist: { movieId: string; comment: string }[];
    favorites: { movieId: string; comment: string }[];
}

// Define the User schema
// Error handling for unique email is managed in the signup logic
// Error handling for password length is managed in the signup logic 
// userModel will include watchlist and favorites fields as arrays of strings (movie IDs or titles)

const userSchema: Schema<IUser> = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (str: string) => isEmail(str),
            message: "Invalid email address",
        },
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    watchlist: [
        {
            movieId: { type: String, required: true },
            comment: { type: String, default: "" },
        },
    ],
    favorites: [
        {
            movieId: { type: String, required: true },
            comment: { type: String, default: "" },
        },
    ],

});

// if the model is already compiled, use it, otherwise compile a new model
const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
