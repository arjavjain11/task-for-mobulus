import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true }
  });

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
