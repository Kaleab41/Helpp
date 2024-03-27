export interface IPaymentReceipt {
    id: string;
    paymentReceipt: string;
    verified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IUploadPayment {
    id: string;
    paymentReceipt: File
}