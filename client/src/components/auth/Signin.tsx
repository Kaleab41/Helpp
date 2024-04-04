import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { ISignInStudent, ZSigninStudentSchema } from "../../api/types/student.type.ts"
import { RoleMenu, VInput } from "../form/index.tsx"
import { useSigninStudentMutation } from "../../api/slices/student.slice.ts"
import { useSigninTeacherMutation } from "../../api/slices/teacher.slice.ts"
import { useSigninAdminMutation } from "../../api/slices/admin.slice.ts"
import { LoggedInUser, useUserAuth } from "../../hooks/user.auth.tsx"
import { ISignInTeacher, ZSigninTeacherSchema } from "../../api/types/teacher.type.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"

type SinginProp = {
  openSigninModal: boolean
  SetSigninModal: (value: boolean) => void
}

export default function Signin({ openSigninModal, SetSigninModal }: SinginProp) {
  const [role, SetRole] = useState<string>("Student")
  const navigate = useNavigate()

  const resolver =
    role === "Student" ? zodResolver(ZSigninStudentSchema) : zodResolver(ZSigninTeacherSchema)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange", resolver: resolver })

  const [studentSignin, {}] = useSigninStudentMutation()
  const [teacherSignin, {}] = useSigninTeacherMutation()
  const [adminSignin, {}] = useSigninAdminMutation()

  const { saveLoggedInUser } = useUserAuth()
  const SetLoggedInUser = (response: any) => {
    const LoggedInUser: LoggedInUser = {
      id: response.id,
      role: role,
      name: response.name,
      email: response.email,
    }
    if (response.batch) LoggedInUser.batch = response.batch
    saveLoggedInUser(LoggedInUser)
    SetSigninModal(false)
    reset()
    navigate(`/${role}`, { replace: true })
  }

  const onSubmit = async (data: ISignInStudent | ISignInTeacher) => {
    try {
      switch (role) {
        case "Student": {
          const response = await studentSignin({ ...data }).unwrap()
          if (response) {
            SetLoggedInUser(response)
          }
          break
        }
        case "Teacher": {
          const response = await teacherSignin({ email: data.id, password: data.password }).unwrap()
          if (response) {
            SetLoggedInUser(response)
          }
          break
        }
        case "Admin": {
          const response = await adminSignin({ email: data.id, password: data.password }).unwrap()
          if (response) {
            SetLoggedInUser(response)
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
      <Modal show={openSigninModal} size="xl" onClose={SetSigninModal} popup dismissible>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Form Title */}
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`${role} Sign In `}</h3>

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
                <Button type="submit">Sign in</Button>
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
