import { ReactNode } from "react"

type LeftRightPageLayoutProps = {
  leftChildren?: ReactNode
  rightChildren?: ReactNode
}
export default function LeftRightPageLayout({
  leftChildren,
  rightChildren,
}: LeftRightPageLayoutProps) {
  return (
    <div className="flex border-t-2 border-gray-300">
      <div className=" border-r-2 border-gray-300 w-3/4 p-4i space-y-3">{leftChildren}</div>
      <div className=" w-1/4 p-4 space-y-5">{rightChildren}</div>
    </div>
  )
}
