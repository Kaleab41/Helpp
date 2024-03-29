import { LeftRightPageLayout, DashboardTable } from "../../components/shared/index"
import { InfoCards, Notification } from "../../components/adminComonents/index"
export default function AdminDash() {
  const InfoCardData = [
    { label: "Pyament Request", value: 5 },
    { label: "Student Pending", value: 5 },
    { label: "Teacher", value: 5 },
  ]
  const Student_Teacher_TableHead = ["Name", "Email", "Phone"]
  const PulledData = [
    { id: "1", description: "John Doe" },
    { id: "2", description: "Jane Smith" },
    { id: "3", description: "Michael Johnson" },
  ]

  return (
    <LeftRightPageLayout
      leftChildren={
        <>
          <InfoCards cards={InfoCardData} />
          <DashboardTable
            tableTitle="Payment"
            headers={Student_Teacher_TableHead}
            tableData={PulledData}
            buttonLabel="See detail"
            ButtonClicked={(row) => {
              console.log(row)
            }}
          />
        </>
      }
      rightChildren={<Notification />}
    />
  )
}
