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
    grade: string;
    mid?: number;
    final?: number;
    assessment?: number;
    attendance?: string;
    course?: string,
    message: string;
}

export interface IStudentGrade {
    id: string;
    studentName: string;
    instructor: string;
    instructorID: string;   
    course: string;
    grade: string;
    mid?: number;
    final?: number;
    assessment?: number;
    total: number;
    file: string;
    batch: string;
    attendance: string; // Array of strings (assuming attendance data is stored as strings)   
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

export interface IApproveGradeChangeRequest {
    teacherId: string;
    requestId: string;
}