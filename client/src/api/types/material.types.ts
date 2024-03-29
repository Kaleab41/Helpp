export interface IUploadMaterialRequest {
    sender: string;
    message: string;
    file: File;
    batch: string;
}

export interface IMaterials {
    sender: string;
    message: string;
    file: string;
    batch: string
}