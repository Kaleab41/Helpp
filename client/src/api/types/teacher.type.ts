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
    aboutYou: string;
    department: string;
    interviewDate: Date;
    curriculumVitae: File;
    qualifications: File;
    certifications: File;
}

export interface ISignupTeacher {
    email: string;
    password: string;
}

export interface ISignInTeacher {
    email: string;
    password: string;
}

