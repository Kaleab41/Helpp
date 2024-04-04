import { Button } from "flowbite-react"
import { IRegistrationStudent } from "../../../api/types/student.type"
import { useState } from "react"
import { useCreateStudentMutation } from "../../../api/slices/student.slice.ts"
import { Input, Select, FileInput, Textarea } from "../../form/index.tsx"
import { z } from "zod"
import { toast } from "react-toastify"


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


  const [create, { }] = useCreateStudentMutation()
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
        toast.success("Registration Successful")

        // dispatch(register(response))
        // console.log(student, "STUDENT");
      }
    } catch (error) {
      toast.success((error as any).error)
    }


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
    <div className="space-y-6">
      {/* Form Title */}
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Apply to the school</h3>

      {/* Form Component */}
      <div className="grid grid-cols-2 gap-2">
        <Input
          name={"Name"}
          placeholder="Enter your name"
          setValue={SetName}
          type="text"
          value={name}
        />

        <Select name="Gender" options={["", "Male", "Female"]} setValue={SetGender} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          name={"Email"}
          placeholder="Enter your email"
          setValue={SetEmail}
          type="text"
          value={email}
        />
        <Input
          name={"Phone"}
          placeholder="Enter your phone"
          setValue={SetPhone}
          type="text"
          value={phone}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          name={"Gurdian Name"}
          placeholder="Enter your gurdian name"
          setValue={SetGuardianName}
          type="text"
          value={guardianName}
        />
        <Input
          name={"Gurdian Phone"}
          placeholder="Enter your gurdian phone"
          setValue={SetGuardianPhone}
          type="text"
          value={guardianPhone}
        />
      </div>
      <Input
        name={"Department"}
        placeholder="Enter your department"
        setValue={SetDepartment}
        type="text"
        value={department}
      />
      <Textarea
        name={"About you"}
        placeholder="Enter description about you"
        SetValue={SetAboutYou}
        value={aboutYou}
      />
      <FileInput
        name="Acadamic Record"
        SetValue={SetAcademicRecord}
        helperText="Upload your acadamic recored "
      />
      {/* Form Action */}
      <div className="flex justify-center">
        <Button type="submit" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  )
}
