import studentManagementApi from "..";
import { IRegistrationStudent, IStudent } from "./student.type";

const studentApiSlice = studentManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        createStudent: builder.mutation<IStudent, IRegistrationStudent>({
            query: (body) => ({
                url: '/student/register',
                method: 'POST',
                body,
            }),
        }),
    })
})

export const { useCreateStudentMutation } = studentApiSlice