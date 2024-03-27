import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const teacherManagementApi = createApi({
    reducerPath: 'teacherManagementApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: () => ({}),
    tagTypes: ['teacher', 'grade', 'courses'],
})

export default teacherManagementApi;