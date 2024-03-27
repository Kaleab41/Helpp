import "./App.css"
import { Routes, Route } from "react-router-dom"
import {
  LandingPage,
  AdminDash,
  TeacherDash,
  StudentDash,
  CourseList,
  StudentList,
  Material,
  Grade,
  Payment,
} from "./pages/index"
import MainNav from "./layouts/MainNav"
import LandingNav from "./layouts/LandingNav"

function App() {
  return (
    <main className="h-screen">
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
          <Route path="/student/grade" element={<Grade />} />
          <Route path="/student/payment" element={<Payment />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
