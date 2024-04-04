import { z } from "zod";

export interface ITeacher {
  id: string;
  name: string;
  gender: string;
  email: string;
  password: string | null;
  phone: number;
  role: string;
  assignedCourses: string[];
  restricted: boolean;
  interviewDate: Date;
  notifications: any[];
  curriculumVitae: string;
  qualifications: string;
  certifications: string;
}

export interface IRegistrationTeacher {
  name: string;
  gender: string;
  email: string;
  phone: string;
  interviewDate: Date | null;
  curriculumVitae: File | null;
  qualifications: File | null;
  certifications: File | null;
}
export const ZRegistrationTeacherSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: z.enum(['', 'Male', 'Female']).refine(value => ['Male', 'Female'].includes(value), { message: "Gender must be Male or Female" }),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10,15}$/, 'Phone number must be number only and  between 10 and 15 digits'),
});

export interface ISignupTeacher {
  email: string;
  password: string;
}

export const ZSignupTeacherSchema = z.object({
  id: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long').max(25, 'Password must not exceed 25 characters'),
});

export interface ISignInTeacher {
  email: string;
  password: string;
}
export const ZSigninTeacherSchema = z.object({
  id: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long').max(25, 'Password must not exceed 25 characters'),
});

export interface ISendNotificationRequest {
  batch: string;
  sender: string;
  message: string;
}
