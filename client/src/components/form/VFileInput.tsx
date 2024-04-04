import { Label } from "flowbite-react"
import { FieldValues, UseFormRegister } from "react-hook-form"

type FileInputProp = {
  label: string
  name: string
  helperText: string
  error: undefined | string
  register: UseFormRegister<FieldValues>
}

export default function VFileInput({ label, name, helperText, error, register }: FileInputProp) {
  const registerValue = register(name)
  return (
    <div id={name} className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <input {...registerValue} name={name} id={name} type="file" />
      {error && <p className="mt-2 text-sm pl-1 text-red-500">{error}</p>}
    </div>
  )
}
