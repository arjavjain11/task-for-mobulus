import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
    city: { type: String, reuired: true },
    status: { type: String },
    role: { type: String }

  });

const User = mongoose.model('User', UserSchema);

export default User;
