import { Label, Textarea as Textarea_ } from "flowbite-react"
type TextareaProp = {
  name: string
  placeholder: string
  value: string | any
  disable: boolean
  SetValue: (value: string) => void
}

export default function Textarea({ name, placeholder, value, disable, SetValue }: TextareaProp) {
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={name} value={name} />
      </div>
      <Textarea_
        className="disabled:cursor-text"
        onChange={(event) => {
          SetValue(event.currentTarget.value)
        }}
        id={name}
        value={value}
        placeholder={placeholder}
        disabled = {disable}
        required
        rows={4}
      />
    </div>
  )
}
