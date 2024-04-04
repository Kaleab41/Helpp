import { Label } from "flowbite-react"
import { FieldValues, UseFormRegister } from "react-hook-form"

type SelectProp = {
  label: string
  name: string
  options: Array<string>
  error: undefined | string
  register: UseFormRegister<FieldValues>
}

export default function VSelect({ label, name, options, error, register }: SelectProp) {
  const registerValue = register(name)
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
        {...registerValue}
        name={name}
        id={name}
      >
        <option selected value="">
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm pl-1 text-red-500">{error}</p>}
    </div>
  )
}
