import { Label, Select as Select_ } from "flowbite-react"

type SelectProp = {
  name: string
  options: Array<string>
  setValue: (value: string) => void
}

export default function Select({ name, options, setValue }: SelectProp) {
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={name} value={name} />
      </div>
      <Select_
        className="w-full"
        id={name}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        required
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Select_>
    </div>
  )
}
