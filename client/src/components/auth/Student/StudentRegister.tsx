import { Button } from "flowbite-react"
import { IRegistrationStudent, ZRegistrationStudentSchema } from "../../../api/types/student.type"
import { useState } from "react"
import { useCreateStudentMutation } from "../../../api/slices/student.slice.ts"
import {
  Input,
  FileInput,
  VInput,
  VSelect,
  VTextarea,
} from "../../form/index.tsx"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZRegistrationTeacherSchema } from "../../../api/types/teacher.type.ts"
import { toast } from "react-toastify"
import LoadingButton from "../../shared/LoadingButton.tsx"

const registrationStudentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  guardianName: z.string().min(1, "Guardian name is required"),
  guardianPhone: z.string().regex(/^\d{10}$/, "Guardian phone number must be 10 digits"),
  aboutYou: z.string().min(1, "About you is required"),
  department: z.string().min(1, "Department is required"),
  academicRecord: z.union([z.instanceof(File), z.null()]),
})

export default function StudentRegister() {
  const [academicRecord, SetAcademicRecord] = useState<IRegistrationStudent["academicRecord"]>(null)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange", resolver: zodResolver(ZRegistrationStudentSchema) })
  const [create, { }] = useCreateStudentMutation()

  const onSubmit = async (data: IRegistrationStudent) => {
    try {
      const response = await create({
        ...data,
        academicRecord,
      }).unwrap()
      if (response) {
        onCloseModal()
        // Kolo or mame, what are we doing by the next line
        // dispatch(register(response))
        toast.success("Student Registered Successfully")

      }
    } catch (error) {
      toast.error(error.data.error)
    }
  }

  function onCloseModal() {
    SetAcademicRecord(null)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Apply to the school</h3>
        <div className="grid grid-cols-2 gap-2">
          <VInput
            name="name"
            label="Name"
            placeholder="Enter your name"
            error={errors.name?.message}
            register={register}
          />
          <VSelect
            label="Gender"
            name="gender"
            options={["Male", "Female"]}
            error={errors.gender?.message}
            register={register}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <VInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            error={errors.email?.message}
            register={register}
          />
          <VInput
            name="phone"
            label="Phone"
            placeholder="Enter your Phone"
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <VInput
            name="guardianName"
            label="Gurdian Name"
            placeholder="Enter your Gurdian Name"
            error={errors.guardianName?.message}
            register={register}
          />
          <VInput
            name="guardianPhone"
            label="Gurdian Phone"
            placeholder="Enter your Gurdian Phone"
            error={errors.guardianPhone?.message}
            register={register}
          />
        </div>
        <VSelect
          label="Department"
          name="department"
          options={["Computer Science ", "Software Engineering"]}
          error={errors.department?.message}
          register={register}
        />
        <VTextarea
          label="About You"
          name="aboutYou"
          placeholder="Enter description about you"
          error={errors.aboutYou?.message}
          register={register}
        />
        <FileInput name="Academic Record" value={academicRecord} SetValue={SetAcademicRecord} helperText="Upload your academic record record" />
        <LoadingButton type="submit" label="Register" loading={isSubmitting} />
      </div>
    </form>
  )
}
