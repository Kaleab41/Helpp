import notFoundImg from "../assets/404.svg"
import { Link } from "react-router-dom"

export default function Error404() {
  return (
    <div className="flex items-center flex-col w-full">
      <img
        src={notFoundImg}
        alt="Can't find what you're looking for!"
        className="max-w-[640px] max-h-[430px]"
      />

      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-4xl font-bold text-center">Page not found</p>
        <p className="text-sm text-gray-500">
          Oops! Looks like you followed a bad link. If you think this is a problem with us, please
          tell us.
        </p>

        <Link className="w-fit bg-teal-600 text-white   text-lg rounded-md px-5 py-3" to={"/"}>
          Go back home
        </Link>
      </div>
    </div>
  )
}
