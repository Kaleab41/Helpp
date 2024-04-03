import { useEffect, useState } from "react";
import { IAdmin } from "../api/types/admin.type";

export function useAdminAuth() {
    const [admin, setUser] = useState<IAdmin | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('admin');
        setUser(savedUser && JSON.parse(savedUser));
    }, []);

    const saveLoggedInUser = (loggedInUser: IAdmin) => {
        localStorage.setItem('admin', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
    };
    const logoutUser = () => {
        localStorage.removeItem('admin');
        setUser(null);
    };

    return { admin, saveLoggedInUser, logoutUser };
};

