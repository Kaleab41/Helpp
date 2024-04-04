import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "flowbite-react";

type ButtonProps = {
  label: string
  loading: boolean
  className?: React.HTMLAttributes<HTMLDivElement>
  type: "button" | "submit" | "reset" | undefined
}

export default function LoadingButton({ label, loading, type, className }: ButtonProps) {
  if (loading)
    return (
      <div className="flex justify-center">
        <Button className={`${className}`} type={type} >
          <Icon className="text-xl mr-2" icon="eos-icons:bubble-loading" />
          {label}</Button>
      </div>
    )
  return (
    <div className="flex justify-center">
      <Button className={`${className}`} type={type} >
        {label}</Button>
    </div>
  )
}
