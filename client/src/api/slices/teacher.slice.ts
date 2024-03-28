import studentManagementApi from "..";
import { ITeacher, IRegistrationTeacher } from "../types/teacher.type";


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
    })
})

export const {
    useCreateTeacherMutation
} = teacherApiSlice
