import { Label, TextInput } from "flowbite-react"
import { SetStateAction } from "react"

type InputProp = {
  name: string
  placeholder?: string
  type: string
  value: string | number | undefined
  helperText: string
  setValue: (value: string | number | SetStateAction<any>) => void
  disabled?: boolean
}

export default function Input({ name, placeholder, type, value, helperText, setValue, disabled = false }: InputProp) {
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
        onChange={(event) =>
          type == "number"
            ? setValue(Number.parseInt(event.target.value))
            : setValue(event.target.value)
        }
        helperText={helperText}
        disabled={disabled}
        required
      />
    </div>
  )
}
