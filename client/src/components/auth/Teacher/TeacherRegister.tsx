import { useState } from "react"
import { Button } from "flowbite-react"
import { IRegistrationTeacher, ZRegistrationTeacherSchema } from "../../../api/types/teacher.type"
import { useCreateTeacherMutation } from "../../../api/slices/teacher.slice"
import { FileInput, DateInput, VInput, VSelect } from "../../form/index"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const TeacherRegister = () => {

  const [create, { }] = useCreateTeacherMutation()

  const [interviewDate, SetInterviewDate] = useState<IRegistrationTeacher["interviewDate"]>(new Date())
  const [curriculumVitae, SetCurriculumVitae] = useState<IRegistrationTeacher["curriculumVitae"]>(null)
  const [qualifications, SetQualifications] = useState<IRegistrationTeacher["qualifications"]>(null)
  const [certifications, SetCertifications] = useState<IRegistrationTeacher["certifications"]>(null)

  const { register, formState: { errors, isSubmitting }, handleSubmit, reset } = useForm<IRegistrationTeacher>({ mode: "onChange", resolver: zodResolver(ZRegistrationTeacherSchema) })

  const onSubmit = async (data: IRegistrationTeacher) => {
    try {
      const response = await create({
        ...data,
        interviewDate,
        curriculumVitae,
        qualifications,
        certifications,
      }).unwrap()
      if (response) {
        toast.success("Registration Successful")
        reset()
      }
    } catch (error) {
      toast.error(error.data.error)
    }

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Apply to the school</h3>
        <div className="grid grid-cols-2 gap-2">
          <VInput label="Name" name="name" placeholder="Enter your naame" error={errors.name?.message} register={register} />
          <VSelect
            label="Gender"
            name="gender"
            options={["Male", "Female"]}
            error={errors.gender?.message}
            register={register}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <VInput label="Email" name="email" placeholder="Enter your email" error={errors.email?.message} register={register} />
          <VInput label="Phone" name="phone" placeholder="Enter your phone" error={errors.phone?.message} register={register} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <DateInput SetValue={SetInterviewDate} name="Interview Date" />
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
          <Button type="submit" >Registe</Button>
        </div>
      </div>
    </form>
  )
}

export default TeacherRegister
