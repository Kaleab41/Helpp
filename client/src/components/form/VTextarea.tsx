import { Label, Textarea as Textarea_ } from "flowbite-react"
import { FieldValues, UseFormRegister } from "react-hook-form"
type TextareaProp = {
  label: string
  name: string
  placeholder: string
  error: undefined | string
  disable?: boolean
  register: UseFormRegister<FieldValues>
}

export default function VTextarea({
  label,
  name,
  placeholder,
  error,
  register,
  disable = false,
}: TextareaProp) {
  const registerValue = register(name)
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <Textarea_
        className="disabled:cursor-text"
        {...registerValue}
        name={name}
        placeholder={placeholder}
        disabled={disable}
        rows={4}
      />
      {error && <p className="mt-2 text-sm pl-1 text-red-500">{error}</p>}
    </div>
  )
}
