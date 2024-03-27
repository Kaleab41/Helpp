import { useState } from "react"

import { Outlet } from "react-router"
import { Navbar } from "flowbite-react"
import Signup from "../components/auth/Signup"
import Signin from "../components/auth/Signin"
import Register from "../components/auth/Register"

export default function LandingNav() {
  const [openRegisterModal, SetRegisterModal] = useState(false)
  const [openSignupModal, SetSignupModal] = useState(false)
  const [openSigninModal, SetSigninModal] = useState(false)
  return (
    <>
      <Navbar fluid rounded>
        {/* Left Logo */}
        <Navbar.Brand href="/">
          <h1 className="text-2xl font-bold text-blue-500">HiLCoE</h1>
        </Navbar.Brand>

        <Register openRegisterModal={openRegisterModal} SetRegisterModal={SetRegisterModal} />
        <Signup openSignupModal={openSignupModal} SetSignupModal={SetSignupModal} />
        <Signin openSigninModal={openSigninModal} SetSigninModal={SetSigninModal} />
        <div>
          <button onClick={() => SetRegisterModal(true)}>Register</button>
          <button onClick={() => SetSignupModal(true)}>Sign-up</button>
          <button onClick={() => SetSigninModal(true)}>Sign-in</button>
        </div>
      </Navbar>
      <Outlet />
    </>
  )
}
