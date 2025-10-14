import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please provide your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: [true, 'Email already exists']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please provide your phone number']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String
        }
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);