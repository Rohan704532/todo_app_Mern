import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
        email: String,
        password: String
});

const notesSchema = new mongoose.Schema({
    notes: {
        type: String,
    },
    done: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Login = mongoose.model('Login', loginSchema)
const Notes = mongoose.model('Notes', notesSchema)


export {Notes, Login}
