import { Dropdown, Navbar } from "flowbite-react"
import { useUserAuth } from "../../hooks/user.auth"

export default function NavItems() {
  const { logoutUser } = useUserAuth()
  let user = localStorage.getItem("user")
  if (user) user = JSON.parse(user)
  else user = null

  if (!user) return <></>
  return (
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <button className="bg-teal-600 text-white px-4 py-2 rounded-full">{user.name[1]}</button>
        }
      >
        <Dropdown.Header>
          <p>{user.name}</p>
        </Dropdown.Header>
        <Dropdown.Item>Change Password</Dropdown.Item>
        <Dropdown.Item onClick={logoutUser} className="hover:bg-red-100">
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  )
}
