const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema, model } = require('mongoose');



const jobsHistorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
        
    },
    salary: {
        type: String,
        trim: true,
     
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },

    applicationStatus: {
        type: String,
        enum: ['pending' , 'accepted', 'rejected'],
        default: 'pending'
    },
   
    user: {
        type: ObjectId,
        ref: "user",
        required: true,
    },
}, 
{ timestamps: true });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'frist name is requiered'],
        maxlength: 32,
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is requiered'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail is requiered'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'please add a valid e-mail'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password  is requiered'],
        minlength: [6, 'password must have at least (6) caracters'],
    },

    jobsHistory: [jobsHistorySchema],

    role: {
        type: String,
        default: 0
    }
}, 
{ timestamps: true });

//encrypting password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//return a jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });

};

module.exports = mongoose.model("user", userSchema);