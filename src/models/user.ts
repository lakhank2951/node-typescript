import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

export default model('users', UserSchema)