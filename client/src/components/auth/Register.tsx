import { Modal } from "flowbite-react"
import { useState } from "react"
import TeacherRegister from "./Teacher/TeacherRegister.tsx"
import RoleMenu from "../form/RoleMenu.tsx"
import StudentRegister from "./Student/StudentRegister.tsx"

type SingupProp = {
  openRegisterModal: boolean
  SetRegisterModal: (value: boolean) => void
}

export default function Register({ openRegisterModal, SetRegisterModal }: SingupProp) {
  const [role, SetRole] = useState<string>("Student")

  function onCloseModal() {
    SetRegisterModal(false)
    SetRole("Student") //default role
  }

  return (
    <>
      <Modal show={openRegisterModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          {role === "Student" && <StudentRegister />}
          {role === "Teacher" && <TeacherRegister />}
          <RoleMenu
            value={role}
            SetValue={SetRole}
            name="RegistrationRole"
            options={["Student", "Teacher"]}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
