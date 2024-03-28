export interface ICourse {
    _id: string;
    courseid: string;
    courseName: string;
    year: number;
}

export interface IAllocatedCoursesResponse {
    allocatedCourses: [],
    courseNames: [],
    batch: []
}

