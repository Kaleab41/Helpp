import "./App.css"
import { Routes, Route } from "react-router-dom"
import { AdminPage, LandingPage, StudentPage, TeacherPage } from "./pages/index"
import MainNav from "./layouts/MainNav"

function App() {
  return (
    <main className="h-screen">
      <Routes>
        <Route element={<MainNav />}>
          <Route index element={<LandingPage />}></Route>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
          <Route path="/student" element={<StudentPage />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
