import teacherManagementApi from ".";
// import { IChangeGradeRequest, IGrade, IGradeChangeRequest } from "../types/grade.types";
import { ITeacher, IRegistrationTeacher } from "../types/teacher.type";


const teacherApiSlice = teacherManagementApi.injectEndpoints({
    endpoints: (builder) => ({
        createTeacher: builder.mutation<ITeacher, IRegistrationTeacher>({
            query: (body) => ({
                url: '/teacher/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['teacher'],
        }),
    }) 
})

export const {
    useCreateTeacherMutation
} = teacherApiSlice
