import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { ISignInStudent } from "../../api/types/student.type.ts"
import { Input, RoleMenu } from "../form/index.tsx"

type SinginProp = {
  openSigninModal: boolean
  SetSigninModal: (value: boolean) => void
}

export default function Signin({ openSigninModal, SetSigninModal }: SinginProp) {
  const [id, SetId] = useState<ISignInStudent["id"]>("")
  const [role, SetRole] = useState<string>("Student")
  const [password, SetPassword] = useState<ISignInStudent["password"]>("")
  function onCloseModal() {
    SetSigninModal(false)
    SetRole("Student") //default role
    SetId("")
    SetPassword("")
  }

  const HanldeSignin = async () => {
    // Signin user
  }

  return (
    <>
      <Modal show={openSigninModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            {/* Form Title */}
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`${role} Sign In `}</h3>

            {/* Form Component */}
            <Input
              name={"Id"}
              placeholder="Enter your id"
              setValue={SetId}
              type="text"
              value={id}
            />
            <Input
              name={"Password"}
              placeholder="Enter your password"
              setValue={SetPassword}
              type="password"
              value={password}
            />

            {/* Form Action */}
            <div className="flex justify-center">
              <Button onClick={HanldeSignin}>Sign in</Button>
            </div>
          </div>
          <RoleMenu
            value={role}
            SetValue={SetRole}
            name="RegistrationRole"
            options={["Student", "Teacher", "Admin"]}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
