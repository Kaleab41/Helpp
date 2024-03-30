export interface IPaymentReceipt {
    id: string;
    paymentReceipt: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IUploadPayment {
    id: string;
    paymentReceipt: File | null
}

export interface IPayment {
    id: string;
    paymentId: string;
    paymentReceipt: string;
    verified: boolean;
    studentName: string;
}