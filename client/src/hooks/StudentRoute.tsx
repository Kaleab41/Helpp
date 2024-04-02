import { Navigate, } from "react-router-dom";
import { useStudentAuth } from "./student.auth";
import { ReactElement } from "react";


export const StudentRoute = ({ component }: { component: ReactElement }): ReactElement | null => {
    const { student } = useStudentAuth();

    return student ? component : <Navigate to="/?redirect=student" replace />;
};