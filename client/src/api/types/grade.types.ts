export interface IGrade {
    course: string;
    requestId: string;
    sender: string;
    message: string;
    approved: boolean;
    time: number;
    mid?: number;
    final?: number;
    assessment?: number;
    grade?: string;
}

export interface IChangeGradeRequest {
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