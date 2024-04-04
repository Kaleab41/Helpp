import { z } from "zod";
import { Button, Dropdown, Navbar } from "flowbite-react"
import { useUserAuth } from "../../hooks/user.auth"
import ModalForm from "../modals/ModalForm"
import { useState } from "react"
import { Input, VInput } from "../form"
import { useChangePasswordMutation } from "../../api/slices/student.slice"
import { toast } from "react-toastify"
import { IStudent } from "../../api/types/student.type"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../shared/LoadingButton";

export default function NavItems() {
  const { logoutUser } = useUserAuth()
  let user = localStorage.getItem("user")
  if (user) user = JSON.parse(user)
  else user = null

  const [openModal, setOpenModal] = useState(false)
  const [Password, setPassword] = useState("")
  const [updatePassword] = useChangePasswordMutation();
  const handleChangePassword = async () => {
    if (!user) return;
    if ((user as any).role !== "Student") return;
    try {
      const response = await updatePassword({ password: Password, id: (user as any).id }).unwrap();
      if (response) {
        toast.success("Password updated successfully");
        setOpenModal(false)
      }
    } catch (error: any) {
      toast.error(error.error);

    }
  }

  const ZPasswordReset = z.object({
    password: z.string().min(8, 'Password must be at least 8 characters long').max(25, 'Password must not exceed 25 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long').max(25, 'Password must not exceed 25 characters').refine((value) => value !== ZPasswordReset.password, {
      message: "Passwords must match", path: ['confirmPassword']
    })
  })
  type IPassordReset = z.infer<typeof ZPasswordReset>



  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<IPassordReset>({ mode: "onChange", resolver: zodResolver(ZPasswordReset) })

  const onSubmit = async (data: IPassordReset) => {
    console.log(data)
  }

  if (!user) return <></>
  return (
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <button className="bg-teal-600 text-white px-4 py-2 rounded-full font-bold text-lg">{user.name[0]}</button>
        }
      >
        <Dropdown.Header>
          <p>{user.name}</p>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => setOpenModal(true)}>Change Password</Dropdown.Item>
        <Dropdown.Item onClick={logoutUser} className="hover:bg-red-100">
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />

      <ModalForm title="Change Password" openModal={openModal} className="w-full" onCloseModal={() => {
        setOpenModal(false)
      }}>
        <form onSubmit={handleSubmit(onSubmit)} onError={console.log(errors)}>
          <VInput label="Password" name="password" placeholder="Enter your password" type="password" error={errors.password?.message} register={register} />
          <VInput label="Confirm Password" name="confirmPassword" placeholder="Enter your password" type="password" error={errors.confirmPassword?.message || errors.confirmPassword?.confirmPassword?.message} register={register} />
          <LoadingButton className="mt-5" label={"Reset"} loading={isSubmitting} type={"submit"} />

        </form>
        {/* <Button */}
        {/*   outline */}
        {/*   onClick={() => handleChangePassword()} */}
        {/* > */}
        {/*   update password */}
        {/* </Button> */}
      </ModalForm>
    </div>
  )
}

