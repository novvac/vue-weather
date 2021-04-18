import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cities: {
        type: Array,
        default: [], 
    }
})

export default mongoose.model("User", UserSchema);