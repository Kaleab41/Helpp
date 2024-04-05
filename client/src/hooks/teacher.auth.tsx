import { useEffect, useState } from "react";
import { ITeacher } from "../api/types/teacher.type";

export function useTeacherAuth() {

  const [teacher, setUser] = useState<ITeacher | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    setUser(savedUser && JSON.parse(savedUser));
  }, []);

  const saveLoggedInUser = (loggedInUser: ITeacher) => {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };
  const logoutUser = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { teacher, saveLoggedInUser, logoutUser };
};

