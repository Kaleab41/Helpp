import Input from "../../form/Input";
import FileInput from "../../form/FileInput";
import { IRegistrationTeacher } from "../../../api/types/teacher.type";
import { useState } from "react";
import Select from "../../form/Select";
import DateInput from "../../form/DateInput";
import { Button } from "flowbite-react";
import { useCreateTeacherMutation } from "../../../api/teacherApi/teacher.slice";



const TeacherRegister = () => {

    const EmptyInputs = () => {
        SetName("");
        SetGender("");
        SetEmail("");
        SetPhone("");
        SetInterviewDate(null);
        SetCurriculumVitae(null);
        SetQualifications(null);
        SetCertifications(null);
    }

    const [create, { }] = useCreateTeacherMutation();

    const [name, SetName] = useState<IRegistrationTeacher["name"]>("")
    const [gender, SetGender] = useState<IRegistrationTeacher["gender"]>("")
    const [email, SetEmail] = useState<IRegistrationTeacher["email"]>("")
    const [phone, SetPhone] = useState<IRegistrationTeacher["phone"]>("")
    const [interviewDate, SetInterviewDate] = useState<IRegistrationTeacher["interviewDate"]>(null)
    const [curriculumVitae, SetCurriculumVitae] = useState<IRegistrationTeacher["curriculumVitae"]>(null)
    const [qualifications, SetQualifications] = useState<IRegistrationTeacher["qualifications"]>(null)
    const [certifications, SetCertifications] = useState<IRegistrationTeacher["certifications"]>(null)
    
    const handleRegister = async () => {

        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append('gender', gender);
          formData.append('email', email);
          formData.append('phone', phone);
          formData.append('interviewDate', interviewDate?.toDateString() ?? " ");
          
          if (curriculumVitae) {
            formData.append('curriculumVitae', curriculumVitae);
          }

          if (qualifications) {
            formData.append('qualifications', qualifications);
          }

          if (certifications) {
            formData.append('certifications', certifications);
          }
          const response = await create(formData).unwrap();
          if (response) {
            EmptyInputs();
          }
        } catch (error) {
          const _error = (error as any).error
          console.log({ _error })
        }

        // Kalesh patch the above in once you create the correct mutation for registering teachers
    
      }
    return (
        <>
            
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
                        <DateInput name="Interview Date" />
                    
                    </div>
                   
                    <FileInput
                        name="Curriculum Vitae"
                        SetValue={SetCurriculumVitae}
                        helperText="Upload your curriculum vitae"
                    />

                    <FileInput
                        name="Qualifications"
                        SetValue={SetQualifications}
                        helperText="Upload your qualification(s)"
                    />

                    <FileInput
                        name="Certifications"
                        SetValue={SetCertifications}
                        helperText="Upload your curriculum vitae"
                    />

                    <div className="flex justify-center">
                        <Button type="submit" onClick={handleRegister}>Register</Button>
                    </div>
                    
                </div>
        </>
    );
}

export default TeacherRegister;