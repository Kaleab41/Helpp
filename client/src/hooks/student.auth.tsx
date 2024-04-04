import { useEffect, useState } from "react";
import { IStudent } from "../api/types/student.type";

export function useStudentAuth() {

    const [student, setUser] = useState<IStudent | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        setUser(savedUser && JSON.parse(savedUser));
    }, []);

    const saveLoggedInUser = (loggedInUser: IStudent) => {
        localStorage.setItem('student', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
    };
    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return { student, saveLoggedInUser, logoutUser };
};

