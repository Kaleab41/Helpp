import { Navbar } from "flowbite-react"
import { useLocation } from "react-router"

export default function NavItems() {
  const location = useLocation()
  switch (location.pathname.split("/")[1]) {
    case "admin":
      return (
        <Navbar.Collapse>
          <Navbar.Link href="/admin" {...(location.pathname == "/admin" ? { active: true } : {})}>
            Dashboard
          </Navbar.Link>
          <Navbar.Link
            href="/admin/courses"
            {...(location.pathname == "/admin/courses" ? { active: true } : {})}
          >
            Courses
          </Navbar.Link>
          <Navbar.Link
            href="/admin/students"
            {...(location.pathname == "/admin/students" ? { active: true } : {})}
          >
            Students
          </Navbar.Link>

          <Navbar.Link
            href="/admin/teachers"
            {...(location.pathname == "/admin/teachers" ? { active: true } : {})}
          >
            Teachers
          </Navbar.Link>
        </Navbar.Collapse>
      )
    case "teacher":
      return (
        <Navbar.Collapse>
          <Navbar.Link
            href="/teacher"
            {...(location.pathname == "/teacher" ? { active: true } : {})}
          >
            Dashboard
          </Navbar.Link>
          <Navbar.Link
            href="/teacher/requests"
            {...(location.pathname == "/teacher/requests" ? { active: true } : {})}
          >
            Requests
          </Navbar.Link>
        </Navbar.Collapse>
      )
    case "student":
      return (
        <Navbar.Collapse>
          <Navbar.Link
            href="/student"
            {...(location.pathname == "/student" ? { active: true } : {})}
          >
            Dashboard
          </Navbar.Link>
          <Navbar.Link
            href="/student/material"
            {...(location.pathname == "/student/material" ? { active: true } : {})}
          >
            Material
          </Navbar.Link>
          <Navbar.Link
            href="/student/payment"
            {...(location.pathname == "/student/payment" ? { active: true } : {})}
          >
            Payment
          </Navbar.Link>
        </Navbar.Collapse>
      )
  }
}
