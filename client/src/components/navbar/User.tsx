import { Button, Dropdown, Navbar } from "flowbite-react"
import { useUserAuth } from "../../hooks/user.auth"
import ModalForm from "../modals/ModalForm"
import { useState } from "react"
import { Input } from "../form"
import { useChangePasswordMutation } from "../../api/slices/student.slice"
import { toast } from "react-toastify"
import { IStudent } from "../../api/types/student.type"

export default function NavItems() {
  const { logoutUser } = useUserAuth()
  let user = localStorage.getItem("user")
  if (user) user = JSON.parse(user)
  else user = null

  const [openModal, setOpenModal] = useState(false)
  const [Password, setPassword] = useState("")
  const [updatePassword] = useChangePasswordMutation();
  const handleChangePassword = async () => {
    if (!user) return;
    if ((user as any).role !== "Student") return;
    try {
      const response = await updatePassword({ password: Password, id: (user as any).id }).unwrap();
      if (response) {
        toast.success("Password updated successfully");
        setOpenModal(false)
      }
    } catch (error: any) {
      toast.error(error.error);

    }
  }

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
        <Dropdown.Item onClick={() => setOpenModal(true)}>Change Password</Dropdown.Item>
        <Dropdown.Item onClick={logoutUser} className="hover:bg-red-100">
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />

      <ModalForm title="Change Password" openModal={openModal} className="w-1/2" onCloseModal={() => {
        setOpenModal(false)
      }}>
        <Input
          name={"password"}
          placeholder="Enter new password"
          setValue={setPassword as any}
          type="text"
          value={Password}
        />
        <Button
          outline
          onClick={() => handleChangePassword()}
        >
          update password
        </Button>
      </ModalForm>
    </div>
  )
}

