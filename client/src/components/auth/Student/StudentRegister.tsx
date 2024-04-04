import { Button } from "flowbite-react"
import { IRegistrationStudent, ZRegistrationStudentSchema } from "../../../api/types/student.type"
import { useState } from "react"
import { useCreateStudentMutation } from "../../../api/slices/student.slice.ts"
import {
  Input,
  Select,
  FileInput,
  Textarea,
  VInput,
  VSelect,
  VTextarea,
  VFileInput,
} from "../../form/index.tsx"
import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZRegistrationTeacherSchema } from "../../../api/types/teacher.type.ts"

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
  const [name, SetName] = useState<IRegistrationStudent["name"]>("")
  const [gender, SetGender] = useState<IRegistrationStudent["gender"]>("")
  const [email, SetEmail] = useState<IRegistrationStudent["email"]>("")
  const [phone, SetPhone] = useState<IRegistrationStudent["phone"]>("")
  const [guardianName, SetGuardianName] = useState<IRegistrationStudent["guardianName"]>("")
  const [guardianPhone, SetGuardianPhone] = useState<IRegistrationStudent["guardianPhone"]>("")
  const [aboutYou, SetAboutYou] = useState<IRegistrationStudent["aboutYou"]>("")
  const [department, SetDepartment] = useState<IRegistrationStudent["department"]>("")
  const [academicRecord, SetAcademicRecord] = useState<IRegistrationStudent["academicRecord"]>(null)

  const [create, {}] = useCreateStudentMutation()
  const handleRegister = async () => {
    try {
      const response = await create({
        name,
        gender,
        email,
        phone,
        guardianName,
        guardianPhone,
        aboutYou,
        department,
        academicRecord,
      }).unwrap()
      if (response) {
        onCloseModal()
        dispatch(register(response))
        console.log(student, "STUDENT")
      }
    } catch (error) {
      toast.success((error as any).error)
    }
  }
  const onSubmit = async (data: IRegistrationStudent) => {
    console.log(data)
  }

  function onCloseModal() {
    SetName("")
    SetGender("")
    SetEmail("")
    SetPhone("")
    SetGuardianName("")
    SetGuardianPhone("")
    SetAboutYou("")
    SetDepartment("")
    SetAcademicRecord(null)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        {/* Form Title */}
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Apply to the school</h3>

        {/* Form Component */}
        {/* <div className="grid grid-cols-2 gap-2">
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
        /> */}
        {/* <Controller
          name="academicRecord"
          control={control}
          defaultValue={null}
          render={({ filed }) => (
            <input
              {...filed}
              type="file"
              onChange={(e) => {
                filed.onChange({ target: { value: e.target.files[0], name: field.name } }) // Manually update the value
              }}
            />
          )}
        /> */}
        {/* <Controller
          control={control}
          name={"academicRecord"}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <Input
                {...field}
                value={value?.fileName}
                onChange={(event) => {
                  onChange(event.target.files[0])
                }}
                type="file"
                id="academicRecord"
              />
            )
          }}
        /> */}
        {errors.academicRecord?.message && <p>{errors.academicRecord.message}</p>}
        <input
          name="academicRecord"
          id="academicRecord"
          type="file"
          {...register("academicRecord", { required: true })}
        />
        {/* <VFileInput
          label="Acadamic Record"
          name="academicRecord"
          error={errors.academicRecord?.message}
          register={register}
        /> */}
        {/* <input type="file" name="academicRecord" {...register("academicRecord")} /> */}
        {/* Form Action */}
        <div className="flex justify-center">
          <Button type="submit">Register</Button>
        </div>
      </div>
    </form>
  )
}
