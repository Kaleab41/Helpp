import { Routes, Route } from "react-router-dom"
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
import Uploads from "./pages/teacher/Uploads"
function App() {
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
          <Route path="/teacher" element={<TeacherDash />} />
          <Route path="/student" element={<StudentDash />} />
          <Route path="/student/material" element={<Material />} />
          <Route path="/student/payment" element={<Payment />} />
          <Route path="/teacher/requests" element={<Requests />} />
        </Route>
        <Route element={<LandingNav />}>
          <Route path="*" element={<Error404 />}></Route>
        </Route>
      </Routes>
    </main>
  )
}

export default App
