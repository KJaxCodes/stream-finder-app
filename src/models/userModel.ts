import { Schema, Document, model, models, Model } from "mongoose";
//validator package to validate email
import { isEmail } from "validator";

export interface IUser extends Document {
    email: string;
    password: string;
    watchlist: { movieId: string; title: string }[];
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
    // User's watchlist of movies (MovieModel references)
    watchlist: [{ type: Schema.Types.ObjectId, ref: 'Movie', required: true }], //example: [ "648a1f2e5f4c3b0012345678", "648a1f2e5f4c3b0012345679" ]
});

// if the model is already compiled, use it, otherwise compile a new model
const User: Model<IUser> = models.User || model<IUser>('User', userSchema);

export default User;
