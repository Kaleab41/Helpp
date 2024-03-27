import { Datepicker, Label } from "flowbite-react";



const DateInput = ({ name }: { name: string}) => {
    return (
        <div>
            <div className="mb-2 w-full">
                <Label htmlFor={name} value={name} />
            </div>
                <Datepicker title={"Interview Date"} />
            </div>
    )
}

export default DateInput;