import { Schema, model } from "mongoose";
import { TFaculty } from "./faculty.interface";

const facultyModel = new Schema<TFaculty>({
    
});


export const Faculty = model<TFaculty>('Faculty', facultyModel);