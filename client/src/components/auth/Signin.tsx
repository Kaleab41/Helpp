import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { ISignInStudent } from "../../api/types/student.type.ts"
import { Input, RoleMenu } from "../form/index.tsx"
import { useSigninStudentMutation } from "../../api/slices/student.slice.ts"
import { useSigninTeacherMutation } from "../../api/slices/teacher.slice.ts"
import { useSigninAdminMutation } from "../../api/slices/admin.slice.ts"
import { useTeacherAuth } from "../../hooks/auth.tsx"

type SinginProp = {
  openSigninModal: boolean
  SetSigninModal: (value: boolean) => void
}

export default function Signin({ openSigninModal, SetSigninModal }: SinginProp) {
  const [id, SetId] = useState<ISignInStudent["id"]>("")
  const [role, SetRole] = useState<"Student" | "Teacher" | "Admin">("Student")
  const [password, SetPassword] = useState<ISignInStudent["password"]>("")

  const [studentSignin, { }] = useSigninStudentMutation();
  const [teacherSignin, { }] = useSigninTeacherMutation();
  const [adminSignin, { }] = useSigninAdminMutation();

  const { saveLoggedInUser } = useTeacherAuth();


  function onCloseModal() {
    SetSigninModal(false)
    SetRole("Student") //default role
    SetId("")
    SetPassword("")
  }

  const HanldeSignin = async () => {
    try {
      switch (role) {
        case "Student": {
          const response = await studentSignin({ id, password }).unwrap()
          if (response) {
            onCloseModal()
          }
          break;
        }
        case "Teacher": {
          const response = await teacherSignin({ email: id, password }).unwrap()
          if (response) {
            saveLoggedInUser(response);
            onCloseModal()
          }
          break;
        }
        case "Admin": {
          const response = await adminSignin({ email: id, password }).unwrap()
          if (response) {
            onCloseModal()
          }
          break
        }
        default:
          break
      }
    } catch (error) {
      const _error = (error as any).data.error
      console.error({ _error })
    }

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
              name={role === "Admin" || role === "Teacher" ? "Email" : "Id"}
              placeholder={`Enter your ${role === "Admin" || role === "Teacher" ? "Email" : "Id"}`}
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
            SetValue={SetRole as any}
            name="RegistrationRole"
            options={["Student", "Teacher", "Admin"]}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
