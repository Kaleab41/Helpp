type RoleMenuProps = {
  name: string
  options: Array<string>
  value: string
  SetValue: (value: string) => void
}
export default function RoleMenu({ name, options, value, SetValue }: RoleMenuProps) {
  const GridColumns = options.length
  return (
    <ul
      className={`grid my-4 text-gray-500 `}
      style={{ gridTemplateColumns: `repeat(${GridColumns},1fr)` }}
    >
      {options.map((option) => (
        <li key={option}>
          <input
            type="radio"
            id={option}
            name={name}
            value={option}
            className="hidden peer "
            checked={value === option}
            onChange={(event) => SetValue(event.target.value)}
            required
          />
          <label
            htmlFor={option}
            className="block text-center w-full cursor-pointer peer-checked:text-teal-600 border-b-2  peer-checked:border-green-800"
          >
            <div className="block">
              <div className="w-full  text-lg font-semibold">{`${option[0].toUpperCase()}${option.slice(1)}`}</div>
            </div>
          </label>
        </li>
      ))}
    </ul>
  )
}
