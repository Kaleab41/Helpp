type InfoCardProp = {
  cards: Array<{ label: string; value: number }>
}
export default function InfoCards({ cards }: InfoCardProp) {
  return (
    <div className="flex justify-around shadow rounded-md p-2 border my-4">
      {cards.map((card) => (
        <div key={card.label} className="flex flex-col w-fit">
          <div className="w-fit mx-auto font-extrabold text-2xl text-teal-600">{card.value}</div>
          <p className="text-gray-700">{card.label}</p>
        </div>
      ))}
    </div>
  )
}
