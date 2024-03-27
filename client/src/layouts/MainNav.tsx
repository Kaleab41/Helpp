import { Navbar } from "flowbite-react"
import { Navigate, Outlet } from "react-router"
import User from "../components/navbar/User"
import NavItems from "../components/navbar/NavItems"

export default function MainNav() {
  const isAuthenticated = false
  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <Navbar fluid rounded>
            {/* Left Logo */}
            <Navbar.Brand href="/">
              <h1 className="text-2xl font-bold text-blue-500">HiLCoE</h1>
            </Navbar.Brand>

            {/* User Icon */}
            <User />

            {/* Navigation Menu*/}
            <NavItems />
          </Navbar>
          <Outlet />
        </>
      )}
    </>
  )
}
