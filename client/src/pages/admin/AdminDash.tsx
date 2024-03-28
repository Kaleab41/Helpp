import Notification from "../../components/adminComonents/Notification"
import DashboardTable from "../../components/shared/dashboardTable/DashboardTable"
export default function AdminDash() {
  return (
    <div className="flex">
      <div className=" border-r-2 border-gray-300 w-3/4 p-4">
        <div className="flex justify-around shadow rounded-md p-2 border my-4">
          <div className="flex flex-col w-fit">
            <div className="w-fit mx-auto font-extrabold text-2xl text-teal-600">5</div>
            <p className="text-gray-700">Payment Requests</p>
          </div>
          <div className="flex flex-col w-fit">
            <div className="w-fit mx-auto font-extrabold text-2xl text-teal-600">5</div>
            <p className="text-gray-700">Student Pending</p>
          </div>
          <div className="flex flex-col w-fit">
            <div className="w-fit mx-auto font-extrabold text-2xl text-teal-600">5</div>
            <p className="text-gray-700">Teacher Pending</p>
          </div>
        </div>
        <DashboardTable
          OnActionButtonClick={() => {
            console.log("hi")
          }}
          headers={["one", "two", "three", "four", ""]}
          tableData={[
            { id: "1", name: "John Doe", age: "30", city: "New York" },
            { id: "2", name: "Jane Smith", age: "25", city: "Los Angeles" },
            { id: "3", name: "Michael Johnson", age: "35", city: "Chicago" },
            { id: "4", name: "Emily Davis", age: "28", city: "San Francisco" },
          ]}
        >
          <button
            onClick={() => {
              alert("five")
            }}
          >
            hi
          </button>
        </DashboardTable>
      </div>
      <div className=" w-1/4 p-4">
        <Notification />
      </div>
    </div>
  )
}
