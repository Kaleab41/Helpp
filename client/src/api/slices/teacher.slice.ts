import studentManagementApi from "..";
import { ITeacher, IRegistrationTeacher, ISignInTeacher, ISignupTeacher } from "../types/teacher.type";


const teacherApiSlice = studentManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        createTeacher: builder.mutation<ITeacher, IRegistrationTeacher>({
            query: (body) => {
                const formData = new FormData()
                formData.append("name", body.name)
                formData.append("gender", body.gender)
                formData.append("email", body.email)
                formData.append("phone", body.phone)
                formData.append("interviewDate", body.interviewDate?.toISOString() ?? " ")
                if (body.curriculumVitae) {
                    formData.append("curriculumVitae", body.curriculumVitae)
                }
                if (body.qualifications) {
                    formData.append("qualifications", body.qualifications)
                }
                if (body.certifications) {
                    formData.append("certifications", body.certifications)
                }
                for (const [key, value] of Object.entries(body)) {
                    console.log({ key, value })
                }
                return {
                    url: '/teacher/register',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['teacher'],
        }),
        signupTeacher: builder.mutation<{ message: string }, ISignupTeacher>({
            query: (body) => ({
                url: '/teacher/signup',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['teacher'],

        }),
        signinTeacher: builder.mutation<ITeacher, ISignInTeacher>({
            query: (body) => ({
                url: '/teacher/signin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['teacher'],

        }),
    })
})

export const {
    useCreateTeacherMutation,
    useSignupTeacherMutation,
    useSigninTeacherMutation,
} = teacherApiSlice
