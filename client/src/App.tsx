import "./App.css"
import { Routes, Route } from "react-router-dom"
import { AdminPage, LandingPage, StudentPage, TeacherPage } from "./pages/index"
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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/student" element={<StudentPage />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
