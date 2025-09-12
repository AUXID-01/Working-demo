
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Username : {
        type: String,
        required: true,
        unique: true,
    },

    firstName : {
        type: String,
        //required: true,
    },

    lastName : {
        type: String,
        //required: true,
    },
    DateOfBirth : {
        type: Date,
        //required: true,
    },
    phoneNumber : {
        type: String,
        //required: true,
    },

    email : {
        type: String,
        required: true,
        unique: true,
    },

    password : {
        type: String,
        required: true,
    },

    role : {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient',
    },
});

let User = mongoose.model('User', userSchema);

export default User;