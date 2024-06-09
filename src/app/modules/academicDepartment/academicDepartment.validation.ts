import { z } from "zod";

const CreateAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic department name must be string",
            required_error: "Academic department name must be required"
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must be string",
            required_error: "Academic Faculty must be required"
        })
    })
})


const UpdateAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic department name must be string",
            required_error: "Academic department name must be required"
        }).optional(),
        academicFaculty: z.string({
            invalid_type_error: "Academic Faculty must be string",
            required_error: "Academic Faculty must be required"
        }).optional()
    })
})




export const academicDepartmentValidation = {
    CreateAcademicDepartmentValidation,
    UpdateAcademicDepartmentValidation
}