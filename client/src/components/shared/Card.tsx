import { ReactNode } from "react"

type CardProps = {
  cardTitle: string
  children: ReactNode
}
export default function Card({ cardTitle, children }: CardProps) {
  return (
    <div className="space-y-2 py-4 mb-8  p-2 w-full rounded-md  shadow-md ">
      <h1 className="text-lg font-bold text-teal-600 mb-5">{cardTitle}</h1>
      {children}
    </div>
  )
}
