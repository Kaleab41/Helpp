import { IDashboardSummary } from "../../api/types/admin.type"

type InfoCardProp = {
  cards: IDashboardSummary | undefined
}
export default function InfoCards({ cards }: InfoCardProp) {
  if (!cards) return null
  return (
    <div className="flex justify-around shadow rounded-md p-2 border my-4 mx-2">
      {Object.keys(cards).map((label: string) => (
        <div key={label} className="flex flex-col w-fit">
          <div className="w-fit mx-auto font-extrabold text-2xl text-teal-600">{cards[label]}</div>
          <p className="text-gray-700 text-sm font-bold">{label.toUpperCase()}</p>
        </div>
      ))}
    </div>
  )
}
