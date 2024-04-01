import { useEffect, useState } from "react";
import { IStudent } from "../api/types/student.type";

export function useStudentAuth() {

    const [student, setUser] = useState<IStudent | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('student');
        setUser(savedUser && JSON.parse(savedUser));
    }, []);

    const saveLoggedInUser = (loggedInUser: IStudent) => {
        localStorage.setItem('student', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
    };
    const logoutUser = () => {
        localStorage.removeItem('student');
        setUser(null);
    };

    return { student, saveLoggedInUser, logoutUser };
};

