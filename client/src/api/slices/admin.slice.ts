import studentManagementApi from "..";
import { ISignInAdmin, ISignupAdmin } from "../types/admin.type";


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
    })
})

export const {
    useSignupAdminMutation,
    useSigninAdminMutation,
} = adminApiSlice
