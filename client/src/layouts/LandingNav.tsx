import { useState } from "react"
import { Icon } from "@iconify/react"
import { Outlet } from "react-router"
import { Button, Navbar } from "flowbite-react"

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
          <h1 className="text-2xl font-extrabold  text-teal-600">HiLPortal</h1>
        </Navbar.Brand>

        <Register openRegisterModal={openRegisterModal} SetRegisterModal={SetRegisterModal} />
        <Signup openSignupModal={openSignupModal} SetSignupModal={SetSignupModal} />
        <Signin openSigninModal={openSigninModal} SetSigninModal={SetSigninModal} />
        <Button.Group outline>
          <Button color="gray" onClick={() => SetRegisterModal(true)}>
            <Icon icon="solar:pen-new-round-line-duotone" className="text-lg mr-2" />
            Register
          </Button>
          <Button color="gray" onClick={() => SetSignupModal(true)}>
            <Icon icon="solar:user-plus-rounded-line-duotone" className="text-lg mr-2" />
            Sign-up
          </Button>
          <Button color="teal" className="bg-teal-50" onClick={() => SetSigninModal(true)}>
            <Icon icon="solar:round-arrow-right-broken" className="text-lg mr-2" />
            Sign-in
          </Button>
        </Button.Group>
      </Navbar>
      <Outlet />
    </>
  )
}
