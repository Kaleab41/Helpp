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

export interface IRegistrationStudent {
    name: string;
    gender: string;
    email: string;
    phone: string;
    guardianName: string;
    guardianPhone: string;
    aboutYou: string;
    department: string;
    academicRecord: string;
}

export interface ISignupStudent {
    id: string;
    password: string;
}

export interface ISignInStudent {
    id: string;
    password: string;
}

export interface IUploadPayment {
    id: string;
    paymentReceipt: {
        type: string;
        src: string;
    };
}

export interface IGradeChangeRequest {
    studentId: string;
    teacherId: string;
    message: string;
}

export interface IGradeChangeRequest {
    teacherId: string;
    studentId: string;
    message: string;
    mid?: number;
    final?: number;
    assessment?: number;
    grade?: string;
    approved: boolean;
    course: string;
}

