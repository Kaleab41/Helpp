import { Label, TextInput } from "flowbite-react"

type InputProp = {
  name: string
  placeholder: string
  type: string
  value: string
  setValue: (value: string) => void
}

export default function Input({ name, placeholder, type, value, setValue }: InputProp) {
  return (
    <div>
      <div className="mb-2 w-full">
        <Label htmlFor={name} value={name} />
      </div>
      <TextInput
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required
      />
    </div>
  )
}
