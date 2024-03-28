export interface ISignupAdmin {
    email: string;
    password: string;
}

export interface ISignInAdmin {
    email: string;
    password: string;
}

export interface ISendNotificationRequest {
    sender: string;
    message: string;
}

export interface IDashboardSummary {
    approved: number;
    pending: number;
    teachers: number;
    course: number;
    numberofBatches: number;
}