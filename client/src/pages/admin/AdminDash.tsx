import { LeftRightPageLayout, DashboardTable } from "../../components/shared/index"
import { InfoCards, Notification } from "../../components/adminComponents/index"
import {
  useGetDashboardDataQuery,
  useGetVerifiedPaymentsQuery,
  useGetPaymentsQuery,
  useVerifyPaymentMutation,
  useRejectPaymentMutation,
} from "../../api/slices/admin.slice"
import { IPayment } from "../../api/types/payment.types"
import ModalForm from "../../components/modals/ModalForm"
import { ReadOnly } from "../../components/form"
import { useRef, useState } from "react"
import { toast } from "react-toastify"
export default function AdminDash() {
  const [openModal, SetOpenModal] = useState<boolean>(false)
  const [pendingPayment, SetPendingPayment] = useState<IPayment | null>(null)
  const { data, isSuccess } = useGetDashboardDataQuery()
  const { data: verifiedPayments } = useGetVerifiedPaymentsQuery()
  const { data: pendingPayments } = useGetPaymentsQuery()
  const [approvePayment, { error: ApprovePaymentError }] = useVerifyPaymentMutation()
  const [deletePayment] = useRejectPaymentMutation()

  const [hrefIndex, setHrefIndex] = useState(0)

  const downloadRecipt = useRef<HTMLAnchorElement | null>(null)
  const [pendingSearchTerm, SetPendingSearchTerm] = useState<string>("")
  const [verifiedSearchTerm, SetVerifiedSearchTerm] = useState<string>("")

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

  const RejectPayment = async (paymentId: string, studentId: string) => {
    try {
      const response = await deletePayment({ paymentId, studentId }).unwrap()
      if (response) {
        toast.success(response.message)
        SetOpenModal(false)
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.error)
    }
  }
  const ApprovePayment = async (paymentId: string) => {
    try {
      const response = await approvePayment({ paymentId }).unwrap()
      if (response) {
        toast.success(response.message)
        SetOpenModal(false)
      }
    } catch (error: any) {
      toast.error(error.error)
    }

  }
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
                onClick={() => ApprovePayment(pendingPayment!.paymentId)}
                className="text-green-500 border-2 rounded-lg p-2 hover:border-green-500 "
              >
                Approve
              </button>
              <button
                onClick={() => RejectPayment(pendingPayment!.paymentId, pendingPayment!.id.trim())}
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
            searchBy="studentName"
            searchByLabel="Student Name"
            searchTerm={pendingSearchTerm}
            SetSearchTerm={SetPendingSearchTerm}
            ButtonClicked={(row) => {
              if (!pendingPayments) return
              SetPendingPayment(pendingPayments[row])
              SetOpenModal(true)
            }}
          />

          <a
            ref={downloadRecipt}
            hidden={true}
            href={`http://localhost:8000/uploads/payments/${verifiedPayments ? verifiedPayments[hrefIndex]?.paymentReceipt : ""}`}
          >
            download
          </a>

          <DashboardTable
            tableTitle="Verfied Payments"
            headers={PaymentTableHead}
            tableData={VerifiedPaymenTableData}
            buttonLabel="Download Recipt"
            searchBy="studentName"
            searchByLabel="Student Name"
            searchTerm={verifiedSearchTerm}
            SetSearchTerm={SetVerifiedSearchTerm}
            ButtonClicked={(row) => {
              setHrefIndex(row)
              downloadRecipt.current?.click()
            }}
          />
        </>
      }
      rightChildren={<Notification />}
    />
  )
}
