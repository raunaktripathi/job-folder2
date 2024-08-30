const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const { ObjectId } = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    salary: {
        type: String,
        trim: true,
        required: [true, 'Salary is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    jobType: {
        type: ObjectId,
        ref: "jobType",
        required: true,
    },

    user: {
        type: ObjectId,
        ref: "user",
        required: true,
    },
}, 
{ timestamps: true });
module.exports = mongoose.model("Job", jobSchema);
