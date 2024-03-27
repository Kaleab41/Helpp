export interface ITeacher {
    name: string;
    gender: string;
    email: string;
    password: string | null;
    phone: number;
    role: string;
    restricted: boolean;
    notifications: any[];
}

export interface IRegistrationTeacher {
    name: string;
    gender: string;
    email: string;
    phone: string;
    aboutYou: string;
    department: string;
    academicRecord: File | null;
}

export interface ISignupTeacher {
    email: string;
    password: string;
}

export interface ISignInTeacher {
    email: string;
    password: string;
}

