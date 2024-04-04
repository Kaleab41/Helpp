import empty from "../assets/empty.svg"

export default function Empty() {
  return (
    <div className="flex items-center flex-col w-full">
      <img
        src={empty}
        alt="Looks like your data is missing"
        className="max-w-[640px] max-h-[430px]"
      />

      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-4xl font-bold text-center p-10">Nothing Here!</p>
      </div>
    </div>
  )
}
