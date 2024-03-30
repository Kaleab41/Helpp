export interface ICourse {
    _id: string;
    courseid: string;
    courseName: string;
    year: number;
}

export interface IAllocatedCoursesResponse {
    courseName: string;
    courseCode: string;
    credithour: number;
    batch: string;
}

export interface IAssignCourseRequest {
    email: string;
    course: string;
    batch: string;
}

export interface INewCourse {
    name: string;
    courseId: string;
    year: number;
}