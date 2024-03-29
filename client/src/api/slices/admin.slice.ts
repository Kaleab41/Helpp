import studentManagementApi from "..";
import { IDashboardSummary, ISendNotificationRequest, ISignInAdmin, ISignupAdmin } from "../types/admin.type";
import { IAssignCourseRequest, ICourse, INewCourse } from "../types/course.types";
import { IPayment } from "../types/payment.types";
import { IStudent } from "../types/student.type";
import { ITeacher } from "../types/teacher.type";


const adminApiSlice = studentManagementApi.injectEndpoints({
    endpoints: (builder) => ({

        signupAdmin: builder.mutation<{ message: string }, ISignupAdmin>({
            query: (body) => ({
                url: '/admin/signup',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['admin'],

        }),
        signinAdmin: builder.mutation<{ message: string }, ISignInAdmin>({
            query: (body) => ({
                url: '/admin/signin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['admin'],

        }),
        assignCourse: builder.mutation<{ message: string }, IAssignCourseRequest>({
            query: (body) => ({
                url: '/admin/assignCourses',
                method: 'POST',
                body,
            }),
        }),
        verifyTeacher: builder.mutation<{ message: string }, { email: string }>({
            query: (body) => ({
                url: '/admin/verifyteacher',
                method: 'POST',
                body,
            }),
        }),
        verifyStudent: builder.mutation<{ message: string }, { id: string }>({
            query: (body) => ({
                url: '/admin/verifystudent',
                method: 'POST',
                body,
            }),
        }),
        verifyPayment: builder.mutation<{ message: string }, { id: string }>({
            query: (body) => ({
                url: '/admin/verifypayment',
                method: 'POST',
                body,
            }),
        }),
        restrictStudent: builder.mutation<{ message: string }, { id: string }>({
            query: (body) => ({
                url: '/admin/restrictstudent',
                method: 'POST',
                body,
            }),
        }),
        addCourse: builder.mutation<ICourse, INewCourse>({
            query: (body) => ({
                url: '/admin/courses',
                method: 'POST',
                body,
            }),
        }),
        generateBatchExcel: builder.mutation<Blob, { batch: string }>({
            query: (body) => ({
                url: '/admin/generateExcel',
                method: 'POST',
                body,
                responseType: 'blob', // Set responseType to 'blob' for file download responses
            }),
        }),
        generateAttendanceExcel: builder.mutation<Blob, { batch: string }>({
            query: (body) => ({
                url: '/admin/generateAttendanceExcel',
                method: 'POST',
                body,
                responseType: 'blob',
            }),
        }),
        sendNotification: builder.mutation<{ message: string }, ISendNotificationRequest>({
            query: (body) => ({
                url: '/admin/sendnotifications',
                method: 'POST',
                body,
            }),
        }),
        getRestrictedAccounts: builder.query<IStudent[], void>({
            query: () => '/admin/restricted',
        }),
        getUniqueBatches: builder.query<string[], void>({
            query: () => '/admin/getbatches',
        }),
        getStudentsInBatch: builder.query<IStudent[], string>({
            query: (batch) => `/admin/getstudents?batch=${batch}`,
        }),
        listTeachers: builder.query<ITeacher[], void>({
            query: () => '/admin/getteachers',
        }),
        getCourseList: builder.query<ICourse[], void>({
            query: () => '/admin/courselist',
        }),
        getPayments: builder.query<IPayment[], void>({
            query: () => '/admin/getpayments',
        }),
        getPendingStudents: builder.query<IStudent[], void>({
            query: () => '/admin/pendingapproval',
        }),
        getPendingTeachers: builder.query<ITeacher[], void>({
            query: () => '/admin/pendingapprovalTeacher',
        }),
        getDashboardData: builder.query<IDashboardSummary, void>({
            query: () => '/admin/dashboard',
        }),
        rejectStudent: builder.mutation<{ message: string }, { id: string }>({
            query: (body) => ({
                url: '/admin/rejectstudent',
                method: 'POST',
                body,
            }),
        }),
        rejectTeacher: builder.mutation<{ message: string }, { id: string }>({
            query: (body) => ({
                url: '/admin/rejectTeacher',
                method: 'POST',
                body,
            }),
        }),
        deleteCourse: builder.mutation<{ message: string }, { courseid: string }>({
            query: (body) => ({
                url: '/admin/courses',
                method: 'DELETE',
                body,
            }),
        }),
    })
})

export const {
    useSignupAdminMutation,
    useSigninAdminMutation,
    useAssignCourseMutation,
    useVerifyTeacherMutation,
    useVerifyStudentMutation,
    useVerifyPaymentMutation,
    useRestrictStudentMutation,
    useAddCourseMutation,
    useGenerateBatchExcelMutation,
    useGenerateAttendanceExcelMutation,
    useSendNotificationMutation,
    useGetRestrictedAccountsQuery,
    useGetUniqueBatchesQuery,
    useGetStudentsInBatchQuery,
    useListTeachersQuery,
    useGetCourseListQuery,
    useGetPaymentsQuery,
    useGetPendingStudentsQuery,
    useGetPendingTeachersQuery,
    useGetDashboardDataQuery,
    useRejectStudentMutation,
    useRejectTeacherMutation,
    useDeleteCourseMutation,
} = adminApiSlice