import { Navbar } from "flowbite-react"
import { useLocation } from "react-router"

export default function NavItems() {
  const location = useLocation()
  console.log(location.pathname.split("/")[1])
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
        </Navbar.Collapse>
      )
    case "teacher":
      return <Navbar.Collapse></Navbar.Collapse>
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
            href="/student/grade"
            {...(location.pathname == "/student/grade" ? { active: true } : {})}
          >
            Grade
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
