import { Button } from "flowbite-react"
import Notification from "../../components/adminComonents/Notification"
import DashboardTable from "../../components/shared/dashboardTable/DashboardTable"
import InfoCards from "../../components/adminComonents/InfoCards"
export default function AdminDash() {
  const InfoCardData = [
    { label: "Pyament Request", value: 5 },
    { label: "Student Pending", value: 5 },
    { label: "Teacher", value: 5 },
  ]
  return (
    <div className="flex">
      <div className=" border-r-2 border-gray-300 w-3/4 p-4">
        <InfoCards cards={InfoCardData} />
        <DashboardTable
          headers={["Type", "Description", ""]}
          tableData={[
            { id: "Pending Payment", description: "John Doe" },
            { id: "Pending Student", description: "Jane Smith" },
            { id: "Pending Teacher", description: "Michael Johnson" },
          ]}
        >
          <Button size={"xs"} outline>
            See Detail
          </Button>
        </DashboardTable>
      </div>
      <div className=" w-1/4 p-4">
        <Notification />
      </div>
    </div>
  )
}
