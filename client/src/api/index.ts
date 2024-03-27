import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentManagementApi = createApi({
    reducerPath: 'studentManagementApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: () => ({}),
    tagTypes: ['student', 'student-paymentHistory', 'courses'],
})

export default studentManagementApi