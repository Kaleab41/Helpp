import { Button, Modal } from "flowbite-react"
import { useState } from "react"
import { IRegistrationStudent } from "../../api/types/student.type.ts"
import Input from "../form/Input.tsx"
import Select from "../form/Select.tsx"
import Textarea from "../form/Textarea.tsx"
import FileInput from "../form/FileInput.tsx"
import { useCreateStudentMutation } from "../../api/student.slice.ts"

type SingupProp = {
  openRegisterModal: boolean
  SetRegisterModal: (value: boolean) => void
}

export default function Register({ openRegisterModal, SetRegisterModal }: SingupProp) {
  const [name, SetName] = useState<IRegistrationStudent["name"]>("")
  const [gender, SetGender] = useState<IRegistrationStudent["gender"]>("")
  const [email, SetEmail] = useState<IRegistrationStudent["email"]>("")
  const [phone, SetPhone] = useState<IRegistrationStudent["phone"]>("")
  const [guardianName, SetGuardianName] = useState<IRegistrationStudent["guardianName"]>("")
  const [guardianPhone, SetGuardianPhone] = useState<IRegistrationStudent["guardianPhone"]>("")
  const [aboutYou, SetAboutYou] = useState<IRegistrationStudent["aboutYou"]>("")
  const [department, SetDepartment] = useState<IRegistrationStudent["department"]>("")
  const [academicRecord, SetAcademicRecord] = useState<IRegistrationStudent["academicRecord"]>(null)

  const [create, { }] = useCreateStudentMutation();
  function onCloseModal() {
    SetRegisterModal(false)
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

  const handleRegister = async () => {

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append('gender', gender);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('guardianName', guardianName);
      formData.append('guardianPhone', guardianPhone);
      formData.append('aboutYou', aboutYou);
      formData.append('department', department);
      if (academicRecord) {
        formData.append('academicRecord', academicRecord);
      }
      const response = await create(formData).unwrap();
      if (response) {
        onCloseModal();
      }
    } catch (error) {
      const _error = (error as any).error
      console.log({ _error })
    }

  }

  return (
    <>
      <Modal show={openRegisterModal} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            {/* Form Title */}
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Apply to the school
            </h3>

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
              <Button type="submit" onClick={handleRegister}>Register</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
