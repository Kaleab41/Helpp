import studentManagementApi from "..";
import { IChangeGradeRequest, IGrade, IGradeChangeRequest, IStudentGrade } from "../types/grade.types";
import { IMaterials } from "../types/material.types";
import { IPaymentReceipt, IUploadPayment } from "../types/payment.types";
import { IChangeRequest, INotificationStudent, IRegistrationStudent, ISignInStudent, ISignupStudent, IStudent, IStudentCourse } from "../types/student.type";

const studentApiSlice = studentManagementApi.injectEndpoints({
    endpoints: (builder) => ({

        createStudent: builder.mutation<IStudent, IRegistrationStudent>({
            query: (body) => {
                const formData = new FormData()
                formData.append("name", body.name)
                formData.append("gender", body.gender)
                formData.append("email", body.email)
                formData.append("phone", body.phone)
                formData.append("guardianName", body.guardianName)
                formData.append("guardianPhone", body.guardianPhone)
                formData.append("aboutYou", body.aboutYou)
                formData.append("department", body.department)
                if (body.academicRecord) {
                    formData.append("academicRecord", body.academicRecord)
                }
                return {
                    url: '/student/register',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: ['student'],
        }),
        signupStudent: builder.mutation<{ message: string }, ISignupStudent>({
            query: (body) => ({
                url: '/student/signup',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['student'],

        }),
        signinStudent: builder.mutation<IStudent, ISignInStudent>({
            query: (body) => ({
                url: '/student/signin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['student'],

        }),
        uploadPayment: builder.mutation<IPaymentReceipt[], IUploadPayment>({
            query: ({ id, paymentReceipt }) => {
                const formData = new FormData();
                formData.append('id', id);
                if (paymentReceipt) {
                    formData.append('paymentReceipt', paymentReceipt);
                }
                return {
                    url: '/student/uploadpayment',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['student-paymentHistory'],
        }),
        changeGradeRequest: builder.mutation<IChangeRequest, IChangeGradeRequest>({
            query: (body) => ({
                url: '/student/gradeChangeRequest',
                method: 'POST',
                body,
            }),
        }),
        generateTranscript: builder.query<Record<string, string>, { id: string }>({
            query: ({ id }) => `student/generatetranscript?id=${id}`,
        }),

        // TODO: 
        // Why are there two changeGradeRequests? Was one supposed to be grade history?
        gradeChangeRequest: builder.mutation<IGrade, IGradeChangeRequest>({
            query: (body) => ({
                url: '/student/gradechangeRequest',
                method: 'POST',
                body,
            }),
        }),


        getNotifications: builder.query<Record<string, INotificationStudent[]>, string>({
            query: (studentId) => `student/getnotification?id=${studentId}`,
            providesTags: ['student']
        }),

        getMaterials: builder.query<IMaterials[], string>({
            query: (batch) => `student/material?batch=${batch}`,
            providesTags: ['student']
        }),

        getGradeHistory: builder.query<IStudentGrade[], string>({
            query: (studentId) => `/student/grades?id=${studentId}`,
            providesTags: ['student-gradeHistory']
        }),

        getPaymentHistory: builder.query<IPaymentReceipt[], string>({
            query: (studentId) => `/student/payment?id=${studentId}`,
            providesTags: ['student-paymentHistory']
        }),
        //TODO: add query for Grade History
        fetchCourses: builder.query<IStudentCourse[], string>({
            query: (studentId) => `/student/courses?id=${studentId}`,
            providesTags: ['courses']
        }),
        changePassword: builder.mutation<{ message: string }, { id: string, password: string }>({
            query: ({ id, password }: { id: string, password: string }) => ({
                url: '/student/changePassword',
                method: 'PATCH',
                body: { id, password },
            }),
        })
    })
})

export const {
    useCreateStudentMutation,
    useSignupStudentMutation,
    useSigninStudentMutation,
    useUploadPaymentMutation,
    useChangeGradeRequestMutation,
    useGradeChangeRequestMutation,
    useGenerateTranscriptQuery,
    useGetPaymentHistoryQuery,
    useFetchCoursesQuery,
    useGetGradeHistoryQuery,
    useGetNotificationsQuery,
    useGetMaterialsQuery,
    useChangePasswordMutation,
} = studentApiSlice