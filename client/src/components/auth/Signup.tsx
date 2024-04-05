import { Button, Modal } from "flowbite-react"
import { useEffect, useState } from "react"
import { ISignupStudent, ZSignupStudentSchema } from "../../api/types/student.type.ts"
import { VInput, RoleMenu } from "../form/index.tsx"
import { useSignupStudentMutation } from "../../api/slices/student.slice.ts"
import { useSignupTeacherMutation } from "../../api/slices/teacher.slice.ts"
import { useSignupAdminMutation } from "../../api/slices/admin.slice.ts"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import {
  ISignupTeacher,
  ZSignupTeacherSchema,
} from "../../api/types/teacher.type.ts"
import LoadingButton from "../shared/LoadingButton.tsx"

type SinginProp = {
  openSignupModal: boolean
  SetSignupModal: (value: boolean) => void
}

export default function Signup({ openSignupModal, SetSignupModal }: SinginProp) {
  const [role, SetRole] = useState<string>("student")

  const resolver =
    role === "student" ? zodResolver(ZSignupStudentSchema) : zodResolver(ZSignupTeacherSchema)
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange",
    resolver: resolver,
  })

  // function to clearout form when chaning roles
  useEffect(() => {
    reset()
  }, [role])

  const [studentSignup, { }] = useSignupStudentMutation()
  const [teacherSignup, { }] = useSignupTeacherMutation()
  const [adminSignup, { }] = useSignupAdminMutation()

  function onCloseModal() {
    SetSignupModal(false)
    SetRole("Student") //default role
    SetId("")
    SetPassword("")
  }

  const onSubmit = async (data: ISignupStudent | ISignupTeacher) => {
    try {
      switch (role) {
        case "student": {
          const response = await studentSignup({ ...data }).unwrap()
          if (response) {
            toast.success("Signup Successful")
            onCloseModal()
          }

          break
        }
        case "teacher": {
          const response = await teacherSignup({ email: data.id, password: data.password }).unwrap()
          if (response) {
            toast.success("Signup Successful")
            onCloseModal()
          }
          break
        }
        default:
          break
      }
    } catch (error) {
      toast.error(error!.data.error)
      const _error = (error as any).data.error
    }
  }

  return (
    <>
      <Modal show={openSignupModal} size="xl" onClose={onCloseModal} popup dismissible>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Form Title */}
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{`${role[0].toUpperCase()}${role.slice(1)} Sign Up `}</h3>
              {/* Form Component */}
              <VInput
                name="id"
                label={role === "student" ? "ID" : "Email"}
                placeholder={`Enter your ${role === "student" ? "Id" : "Email"}`}
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
              <LoadingButton type="submit" label="Sign Up" loading={isSubmitting} />
            </div>
            <RoleMenu
              value={role}
              SetValue={SetRole}
              name="RegistrationRole"
              options={["student", "teacher"]}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
