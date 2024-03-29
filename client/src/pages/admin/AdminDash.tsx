import { LeftRightPageLayout, DashboardTable } from "../../components/shared/index"
import { InfoCards, Notification } from "../../components/adminComonents/index"
import {
  useGetDashboardDataQuery,
  useGetVerifiedPaymentsQuery,
  useGetPaymentsQuery,
  useVerifyPaymentMutation,
} from "../../api/slices/admin.slice"
import { IPayment } from "../../api/types/payment.types"
import ModalForm from "../../components/modals/ModalForm"
import { ReadOnly } from "../../components/form"
import { useState } from "react"
import { toast } from "react-toastify"
export default function AdminDash() {
  const [openModal, SetOpenModal] = useState<boolean>(false)
  const [pendingPayment, SetPendingPayment] = useState<IPayment | null>(null)
  const { data, isSuccess } = useGetDashboardDataQuery()
  const { data: verifiedPayments } = useGetVerifiedPaymentsQuery()
  const { data: pendingPayments } = useGetPaymentsQuery()
  const [ApprovePayment, { error: ApprovePaymentError }] = useVerifyPaymentMutation()

  const PaymentTableHead = ["id", "Verified", "studentName"]
  const VerifiedPaymenTableData =
    verifiedPayments?.map((payment) => ({
      id: payment.id,
      verified: "Verified",
      studentName: payment.studentName,
    })) || []
  const PendingPaymenTableData =
    pendingPayments?.map((payment) => ({
      id: payment.id,
      verified: "Pending",
      studentName: payment.studentName,
    })) || []

  const DownloadRecipt = (ppaymentId: string) => {

  }

  const RejectPayment = (paymentId: IPayment["id"]) => { }
  return (
    <LeftRightPageLayout
      leftChildren={
        <>
          <ModalForm
            title="Pending Payment"
            openModal={openModal}
            onCloseModal={() => {
              SetOpenModal(false)
            }}
          >
            <ReadOnly label="Id" value={pendingPayment?.id} />
            <ReadOnly label="Student Name" value={pendingPayment?.studentName} />
            <ReadOnly label="Verified" value={"Pending"} />
            <ReadOnly
              label="Recipt"
              link={`http://localhost:8000/uploads/files/${pendingPayment?.paymentReceipt}`}
              value={
                <a
                  href={`http://localhost:8000/uploads/files/${pendingPayment?.paymentReceipt}`}
                  download
                >
                  Download Recipt
                </a>
              }
            />
            <div className="flex justify-around mt-5">
              <button
                onClick={async () => {
                  const response = await ApprovePayment({ paymentId: pendingPayment!.paymentId }).unwrap()
                  if (response) {
                    toast.success(response.message)
                    SetOpenModal(false)
                  } else if (ApprovePaymentError) toast.error("Payment approval failed.")
                }}
                className="text-green-500 border-2 rounded-lg p-2 hover:border-green-500 "
              >
                Approve
              </button>
              <button
                onClick={() => RejectPayment(pendingPayment!.id)}
                className="text-red-500 border-2 rounded-lg p-2 px-4 hover:border-red-500 "
              >
                Reject
              </button>
            </div>
          </ModalForm>
          {isSuccess ? <InfoCards cards={data} /> : null}
          <DashboardTable
            tableTitle="Pending Payments"
            headers={PaymentTableHead}
            tableData={PendingPaymenTableData}
            buttonLabel="Show Detail"
            ButtonClicked={(row) => {
              if (!pendingPayments) return
              SetPendingPayment(pendingPayments[row])
              SetOpenModal(true)
            }}
          />
          <DashboardTable
            tableTitle="Verfied Payments"
            headers={PaymentTableHead}
            tableData={VerifiedPaymenTableData}
            buttonLabel="Download Recipt"
            ButtonClicked={(row) => DownloadRecipt(verifiedPayments ? verifiedPayments[row].paymentReceipt : "")}
          />
        </>
      }
      rightChildren={<Notification />}
    />
  )
}
