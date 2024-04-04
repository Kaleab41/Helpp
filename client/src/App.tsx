import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import {
  LandingPage,
  AdminDash,
  TeacherDash,
  StudentDash,
  CourseList,
  StudentList,
  Material,
  Payment,
} from "./pages/index"
import MainNav from "./layouts/MainNav"
import LandingNav from "./layouts/LandingNav"
import Error404 from "./pages/Error404"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Requests from "./pages/teacher/Requests"
import { useEffect, useMemo } from "react"
import TeacherList from "./pages/admin/TeacherList"
function App() {
  /* Route protection */
  // Temp variable
  // const user = undefined // user is always undefined...
  const user = { Id: "PD9209", role: "student" }

  const navigate = useNavigate()
  const location = useLocation()

  const rolePathMapping = useMemo(
    () => ({
      admin: "admin",
      teacher: "teacher",
      student: "student",
    }),
    []
  ) // What in the infinte loop did you create? Why useMemo, if it's an empty dependency array and the output never changes? Doesn't this just create a normal object eacht time?
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true })
      return
    }
    if (location.pathname === "/") {
      if (user) navigate(`/${user.role}`, { replace: true })
      return
    }
    const currentPathStart = location.pathname.split("/")[1]
    for (const role in rolePathMapping) {
      if (user.role !== role && currentPathStart === role) navigate("/", { replace: true })
    }
  }, [user, navigate, location, rolePathMapping])

  /* Route protection */
  return (
    <main className="h-screen w-[80%] mx-auto mt-5">
      <ToastContainer />
      <Routes>
        <Route element={<LandingNav />}>
          <Route index element={<LandingPage />}></Route>
        </Route>
        <Route element={<MainNav />}>
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/admin/courses" element={<CourseList />} />
          <Route path="/admin/students" element={<StudentList />} />
          <Route path="/admin/teachers" element={<TeacherList />} />

          <Route path="/teacher" element={<TeacherDash />} />
          <Route path="/teacher/requests" element={<Requests />} />

          <Route path="/student" element={<StudentDash />} />
          <Route path="/student/material" element={<Material />} />
          <Route path="/student/payment" element={<Payment />} />
        </Route>
        <Route element={<LandingNav />}>
          <Route path="*" element={<Error404 />}></Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App
