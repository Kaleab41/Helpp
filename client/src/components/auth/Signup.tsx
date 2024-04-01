import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { ISignupStudent, ZSignupStudentSchema } from "../../api/types/student.type.ts"
import { VInput, RoleMenu } from "../form/index.tsx"
import { useSignupStudentMutation } from "../../api/slices/student.slice.ts"
import { useSignupTeacherMutation } from "../../api/slices/teacher.slice.ts"
import { useSignupAdminMutation } from "../../api/slices/admin.slice.ts"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import {
  ISignInTeacher,
  ISignupTeacher,
  ZSignupTeacherSchema,
} from "../../api/types/teacher.type.ts"

type SinginProp = {
  openSignupModal: boolean
  SetSignupModal: (value: boolean) => void
}

export default function Signup({ openSignupModal, SetSignupModal }: SinginProp) {
  const [role, SetRole] = useState<string>("Student")

  const resolver =
    role === "Student" ? zodResolver(ZSignupStudentSchema) : zodResolver(ZSignupTeacherSchema)
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: resolver,
  })

  const [studentSignup, {}] = useSignupStudentMutation()
  const [teacherSignup, {}] = useSignupTeacherMutation()
  const [adminSignup, {}] = useSignupAdminMutation()

  function onCloseModal() {
    SetSignupModal(false)
    SetRole("Student") //default role
    SetId("")
    SetPassword("")
  }

  const onSubmit = async (data: ISignupStudent | ISignupTeacher) => {
    try {
      switch (role) {
        case "Student": {
          const response = await studentSignup({ ...data }).unwrap()
          if (response) {
            onCloseModal()
            history.push("/my-route")
          }

          break
        }
        case "Teacher": {
          const response = await teacherSignup({ email: data.id, password: data.password }).unwrap()
          if (response) {
            onCloseModal()
          }
          break
        }
        case "Admin": {
          const response = await adminSignup({ email: data.id, password: data.password }).unwrap()
          if (response) {
            onCloseModal()
          }
          break
        }
        default:
          break
      }
    } catch (error) {
      toast.error(error.data.error)
      const _error = (error as any).data.error
      console.error({ _error })
    }
  }

  return (
    <>
      <Modal show={openSignupModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Form Title */}
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`${role} Sign Up `}</h3>
              {/* Form Component */}
              <VInput
                name="id"
                label={role === "Student" ? "ID" : "Email"}
                placeholder={`Enter your ${role === "Student" ? "Id" : "Email"}`}
                error={errors.id?.message}
                register={register}
              />
              <VInput
                name="password"
                label="Passord"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                register={register}
              />
              {/* Form Action */}
              <div className="flex justify-center">
                <Button type="submit">Sign up</Button>
              </div>
            </div>
            <RoleMenu
              value={role}
              SetValue={SetRole}
              name="RegistrationRole"
              options={["Student", "Teacher", "Admin"]}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
