import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for the job']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the job']    
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: Number,
        required: [true, 'Please provide a salary for the job']
    },
    experienceLevel: {
        type: Number,
        required: [true, 'Please provide an experience level for the job'],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location for the job']
    },
    jobType: {
        type: String,
        required: [true, 'Please provide a job type for the job']
    },
    position: {
        type: Number,
        required: [true, 'Please provide a position for the job']
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]
}, { timestamps: true });
export const Job = mongoose.model("Job", jobSchema);