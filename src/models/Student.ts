// src/models/Student.ts

import mongoose, { Schema } from "mongoose";
import User, { IUser } from "./User";

interface IStudent extends IUser {
  grade: string;
}

const StudentSchema: Schema = new Schema({
  grade: { type: String, required: true },
});

StudentSchema.add(User.schema);

export default mongoose.model<IStudent>("Student", StudentSchema);
