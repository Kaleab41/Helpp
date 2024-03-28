import Notification from "../../components/adminComonents/Notification"
export default function AdminDash() {
  return (
    <div className="flex w-full ">
      <div className=" border-r-2 border-gray-300 w-3/4 p-4">Main</div>
      <div className=" w-1/4 p-4">
        <Notification />
      </div>
    </div>
  )
}
