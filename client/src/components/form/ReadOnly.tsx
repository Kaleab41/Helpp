import { ReactNode } from "react"

type ReadOnly = {
  label: string
  value: string | ReactNode
  link?: string
}
export default function ReadOnly({ label, value, link }: ReadOnly) {
  return (
    <div className="mb-2 w-full">
      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</p>
      {!link ? (
        <p className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg  p-2.5">
          {value}
        </p>
      ) : (
        <a className="text-teal-500 underline " href={link}>{`Download ${label}`}</a>
      )}
    </div>
  )
}
