import { useState } from "react"

import { Outlet } from "react-router"
import { Navbar } from "flowbite-react"
import Signup from "../components/auth/Signup"
import Signin from "../components/auth/Signin"

export default function LandingNav() {
  const [openSignupModal, SetSignupModal] = useState(false)
  const [openSigninModal, SetSigninModal] = useState(false)
  return (
    <>
      <Navbar fluid rounded>
        {/* Left Logo */}
        <Navbar.Brand href="/">
          <h1 className="text-2xl font-bold text-blue-500">HiLCoE</h1>
        </Navbar.Brand>

        <Signup openSignupModal={openSignupModal} SetSignupModal={SetSignupModal} />
        <Signin openSigninModal={openSigninModal} SetSigninModal={SetSigninModal} />
        <div>
          <button onClick={() => SetSignupModal(true)}>Signup</button>
          <button onClick={() => SetSignupModal(true)}>Login</button>
        </div>
      </Navbar>
      <Outlet />
    </>
  )
}
