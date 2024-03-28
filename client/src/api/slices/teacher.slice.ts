import studentManagementApi from "..";
import { IAllocatedCoursesResponse } from "../types/course.types";
import { IApproveGradeChangeRequest, IGrade } from "../types/grade.types";
import { IUploadMaterialRequest } from "../types/material.types";
import { ITeacher, IRegistrationTeacher, ISignInTeacher, ISignupTeacher, ISendNotificationRequest } from "../types/teacher.type";


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
        uploadGrade: builder.mutation<void, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/teacher/upload',
                    method: 'POST',
                    body: formData,
                }
            },
        }),
        uploadMaterial: builder.mutation<{ message: string }, IUploadMaterialRequest>({
            query: (body) => {
                const formData = new FormData();
                formData.append('batch', body.batch);
                formData.append('file', body.file);
                formData.append('message', body.message);
                formData.append('sender', body.sender);
                return {
                    url: '/teacher/uploadmaterial',
                    method: 'POST',
                    body: formData,
                }
            },
        }),
        uploadAttendance: builder.mutation<void, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/teacher/uploadattendance',
                    method: 'POST',
                    body: formData,
                }
            },
        }),
        approveGradeChange: builder.mutation<void, IApproveGradeChangeRequest>({
            query: (body) => ({
                url: '/teacher/approveGradeChangeRequest',
                method: 'POST',
                body,
            }),
        }),
        sendNotification: builder.mutation<{ message: string }, ISendNotificationRequest>({
            query: (body) => ({
                url: '/teacher/sendnotifications',
                method: 'POST',
                body,
            }),
        }),
        getAllocatedCourses: builder.query<IAllocatedCoursesResponse, { email: string }>({
            query: (params) => ({
                url: `/teacher/allocatedcourses`,
                method: 'GET',
                params,
            }),
        }),
        getGradeChangeRequests: builder.query<IGrade, { teacherId: string }>({
            query: (params) => ({
                url: `/teacher/gradechangeRequests`,
                method: 'GET',
                params: { id: params.teacherId },
            }),
        }),
    })
})

export const {
    useCreateTeacherMutation,
    useSignupTeacherMutation,
    useSigninTeacherMutation,
    useUploadGradeMutation,
    useUploadMaterialMutation,
    useUploadAttendanceMutation,
    useApproveGradeChangeMutation,
    useSendNotificationMutation,
    useGetAllocatedCoursesQuery,
    useGetGradeChangeRequestsQuery,
} = teacherApiSlice
