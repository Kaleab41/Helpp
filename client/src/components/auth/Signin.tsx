import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import {  ZSigninStudentSchema } from "../../api/types/student.type.ts"
import { RoleMenu, VInput } from "../form/index.tsx"
import { useSigninStudentMutation } from "../../api/slices/student.slice.ts"
import { useSigninTeacherMutation } from "../../api/slices/teacher.slice.ts"
import { useSigninAdminMutation } from "../../api/slices/admin.slice.ts"
import { useTeacherAuth } from "../../hooks/teacher.auth.tsx"
import { useStudentAuth } from "../../hooks/student.auth.tsx"
import { ZSigninTeacherSchema } from "../../api/types/teacher.type.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type SinginProp = {
  openSigninModal: boolean
  SetSigninModal: (value: boolean) => void
}

export default function Signin({ openSigninModal, SetSigninModal }: SinginProp) {
  const [role, SetRole] = useState<string>("Student")

  const resolver =
    role === "Student" ? zodResolver(ZSigninStudentSchema) : zodResolver(ZSigninTeacherSchema)

  const {register, formState:{errors,isSubmitting},handleSubmit} = useForm({mode:"onChange"}, resolver:resolver)

  

  const [studentSignin, {}] = useSigninStudentMutation()
  const [teacherSignin, {}] = useSigninTeacherMutation()
  const [adminSignin, {}] = useSigninAdminMutation()

  const { saveLoggedInUser: saveLoggedInTeacher } = useTeacherAuth()
  const { saveLoggedInUser: saveLoggedInStudent } = useStudentAuth()

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
            saveLoggedInStudent(response)
            onCloseModal()
          }
          break
        }
        case "Teacher": {
          const response = await teacherSignin({ email: id, password }).unwrap()
          if (response) {
            saveLoggedInTeacher(response)
            onCloseModal()
          }
          break
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
          <form action="">
            <div className="space-y-6">
              {/* Form Title */}
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`${role} Sign In `}</h3>

              {/* Form Component */}
              <VInput 
              name="Id"
                label={role === "Student" ? "ID" : "Email"}
                placeholder={`Enter your ${role === "Student" ? "Id" : "Email"}`}
                error={errors.id?.message}
                register={register}
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
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
