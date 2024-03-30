import { Label, FileInput as FileInput_ } from "flowbite-react"

type FileInputProp = {
  name: string
  helperText: string
  // value: File | null
  SetValue: (value: File | null) => void
}

export default function FileInput({ name, helperText, SetValue }: FileInputProp) {
  return (
    <div id="fileUpload" className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={name} value={name} />
      </div>
      <FileInput_
        required
        onChange={(event) => {
          {
            const files = event.currentTarget.files
            if (files && files.length > 0) {
              SetValue(files[0])
            } else {
              SetValue(null)
            }
          }
        }}
        id={name}
        // value={value}
        helperText={helperText}
      />
    </div>
  )
}
