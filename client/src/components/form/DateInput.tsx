import { Datepicker, Label } from "flowbite-react"

type DateInputProps = {
  name: string
  SetValue: (value: Date) => void
}
const DateInput = ({ name, SetValue }: DateInputProps) => {
  return (
    <div>
      <div className="mb-2 w-full">
        <Label htmlFor={name} value={name} />
      </div>
      <Datepicker min={new Date().toString()} onSelectedDateChanged={(date) => SetValue(date)} />
    </div>
  )
}

export default DateInput
