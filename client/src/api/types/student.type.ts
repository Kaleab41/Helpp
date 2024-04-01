import { z } from "zod";

export interface IStudent {
    id: string;
    batch: string;
    name: string;
    gender: string;
    email: string;
    password: string | null;
    phone: number;
    guardianPhone: string;
    guardianName: string;
    department: string;
    aboutYou: string;
    academicRecord: string;
    role: string;
    restricted: boolean;
    notifications: any[];
}

export interface IStudentCourse {
    _id: string;
    courseName: string;
    year: number;
    credithour: number;
    courseid: string;
    status: boolean;
}

export interface IRegistrationStudent {
    name: string;
    gender: string;
    email: string;
    phone: string;
    guardianName: string;
    guardianPhone: string;
    aboutYou: string;
    department: string;
    academicRecord: File | null;
}
export const ZRegistrationStudentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    gender: z.enum(['Male', 'Female', 'Other']),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
    guardianName: z.string().min(1, 'Guardian name is required'),
    guardianPhone: z.string().regex(/^\d{10}$/, 'Guardian phone number must be 10 digits'),
    aboutYou: z.string().min(1, 'About you is required'),
    department: z.string().min(1, 'Department is required'),
    academicRecord: z.union([z.instanceof(File), z.null()]),
   });

export interface ISignupStudent {
    id: string;
    password: string;
}

export const ZSignupStudentSchema = z.object({
 id: z.string().min(1, 'ID is required'),
 password: z.string().min(8, 'Password must be at least 8 characters long').max(25, 'Password must not exceed 25 characters'),
});

export interface INotificationStudent {
    sender: string,
    message: string,
    time: Date,
    id: string
}



export interface ISignInStudent {
    id: string;
    password: string;
}

export interface IChangeRequest {
    requestId: string;
    sender: string;
    message: string;
    approved: boolean;
    time: number;
}
