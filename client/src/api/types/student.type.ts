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
    academicRecord: File | null;
}

export interface ISignupStudent {
    id: string;
    password: string;
}

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
