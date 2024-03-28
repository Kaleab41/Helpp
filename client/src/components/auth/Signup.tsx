import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { ISignupStudent } from "../../api/types/student.type.ts"
import { Input, RoleMenu } from "../form/index.tsx"
import { useSignupStudentMutation } from "../../api/slices/student.slice.ts"
import { useSignupTeacherMutation } from "../../api/slices/teacher.slice.ts"
import { useSignupAdminMutation } from "../../api/slices/admin.slice.ts"

type SinginProp = {
  openSignupModal: boolean
  SetSignupModal: (value: boolean) => void
}

export default function Signup({ openSignupModal, SetSignupModal }: SinginProp) {
  const [id, SetId] = useState<ISignupStudent["id"]>("")
  const [password, SetPassword] = useState<ISignupStudent["password"]>("")
  const [role, SetRole] = useState<string>("Student")

  const [studentSignup, { }] = useSignupStudentMutation();
  const [teacherSignup, { }] = useSignupTeacherMutation();
  const [adminSignup, { }] = useSignupAdminMutation();


  function onCloseModal() {
    SetSignupModal(false)
    SetRole("Student") //default role
    SetId("")
    SetPassword("")
  }

  const HanldeSignup = async () => {
    try {
      switch (role) {
        case "Student": {
          const response = await studentSignup({ id, password }).unwrap()
          if (response) {
            onCloseModal()
          }
          break;
        }
        case "Teacher": {
          const response = await teacherSignup({ email: id, password }).unwrap()
          if (response) {
            onCloseModal()
          }
          break;
        }
        case "Admin": {
          const response = await adminSignup({ email: id, password }).unwrap()
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
      <Modal show={openSignupModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            {/* Form Title */}
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`${role} Sign Up `}</h3>

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
              <Button onClick={HanldeSignup}>Sign up</Button>
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
