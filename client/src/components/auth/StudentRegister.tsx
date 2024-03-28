import { Button, FileInput, Select, Textarea } from "flowbite-react"
import Input from "../form/Input"

export default function StudentRegister() {
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
