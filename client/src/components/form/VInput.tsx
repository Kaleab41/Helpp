import { Label } from "flowbite-react"
import { FieldValues, UseFormRegister } from "react-hook-form"

type InputProp = {
  label: string
  name: string
  type?: string
  placeholder: string
  error: undefined | string
  register: UseFormRegister<FieldValues>
}
export default function VInput({
  name,
  label,
  type = "text",
  placeholder,
  error,
  register,
}: InputProp) {
  const registerValue = register(name)
  return (
    <div>
      <div className="mb-2 w-full">
        <Label htmlFor={name} value={label} />
      </div>
      <input
        className={
          error
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
            : "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        }
        {...registerValue}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="mt-2 text-sm pl-1 text-red-500">{error}</p>}
    </div>
  )
}
