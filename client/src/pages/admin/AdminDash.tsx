import { LeftRightPageLayout, DashboardTable } from "../../components/shared/index"
import { InfoCards, Notification } from "../../components/adminComonents/index"
import { useGetDashboardDataQuery, useGetPaymentsQuery } from "../../api/slices/admin.slice"
export default function AdminDash() {

  const { data, isSuccess } = useGetDashboardDataQuery();
  const { data: payments } = useGetPaymentsQuery();

  const Student_Teacher_TableHead = ["id", "paymentReceipt", "verified", "studentName"]

  const filteredTableData = payments?.filter(payment => {
    return Object.keys(payment).some(key => Student_Teacher_TableHead.includes(key));
  }).map((data: any) => {
    return Student_Teacher_TableHead.reduce((acc: Record<string, string>, key: string) => {
      acc[key] = data[key];
      return acc;
    }, {});

  }) || [];

  return (
    <LeftRightPageLayout
      leftChildren={
        <>
          {isSuccess ? <InfoCards cards={data} /> : null}
          <DashboardTable
            tableTitle="Payment"
            headers={Student_Teacher_TableHead}
            tableData={filteredTableData}
            buttonLabel="See detail"
            ButtonClicked={(row) => {
              console.log(row);
            }} show={false} />
        </>
      }
      rightChildren={<Notification />}
    />
  )
}
