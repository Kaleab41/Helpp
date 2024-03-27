import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const studentManagementApi = createApi({
    reducerPath: 'studentManagementApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: () => ({}),
})

export default studentManagementApi