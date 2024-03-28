export interface ITeacher {
    name: string;
    gender: string;
    email: string;
    password: string | null;
    phone: number;
    role: string;
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

export interface ISignupTeacher {
    email: string;
    password: string;
}

export interface ISignInTeacher {
    email: string;
    password: string;
}

export interface ISendNotificationRequest {
    batch: string;
    sender: string;
    message: string;
}