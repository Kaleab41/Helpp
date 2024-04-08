import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const appURL = process.env.REACT_APP_URL;

export const studentManagementApi = createApi({
    reducerPath: 'studentManagementApi',
    baseQuery: fetchBaseQuery({ baseUrl: appURL }),
    endpoints: () => ({}),
    tagTypes: ['student', 'student-paymentHistory', 'student-gradeHistory', 'courses', 'teacher', 'grade', 'admin'],
})

export default studentManagementApi