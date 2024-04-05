import { Button, Card, Spinner } from "flowbite-react"
import { useGetPaymentHistoryQuery, useUploadPaymentMutation } from "../../api/slices/student.slice"
import { useState } from "react"
import ModalForm from "../../components/modals/ModalForm"
import { FileInput, Input } from "../../components/form"
import { toast } from "react-toastify"
import { useUserAuth } from "../../hooks/user.auth"

export default function Payment() {
  const { user: student } = useUserAuth()

  const formatDate = (date: string) => {
    const formattedDate = new Date(date)
    return formattedDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  const [open, setOpen] = useState<boolean>(false)
  const [studentId, setStudentId] = useState<string>(student?.id || "")
  const [receipt, setReceipt] = useState<File | null>(null)

  const [uploadReceipt, { isLoading: uploadingReceipt }] = useUploadPaymentMutation()
  const {
    data: payments,
    isLoading: gettingPayments,
    isSuccess: gotPayments,
  } = useGetPaymentHistoryQuery(student?.id)
  const paymentsFiltered = payments?.map((payment) => ({
    id: payment?.id,
    paymentReceipt: payment?.paymentReceipt,
    verified: payment?.verified,
    createdAt: payment?.createdAt,
    udpatedAt: payment?.updatedAt,
  }))

  const uploadPayment = async () => {
    try {
      const response = await uploadReceipt({
        id: student?.id,
        paymentReceipt: receipt,
      }).unwrap()
      setOpen(false)
      if (response) {
        toast.success("Payment Added Successful")
      }
    } catch (error: any) {
      toast.error(error.error)
    }
  }

  return (
    <>
      <div className="w-full flex justify-end p-4 border-b-2 mb-4">
        <Button onClick={() => setOpen(true)}>pay</Button>
      </div>

      {gettingPayments && (
        <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold mt-2">
          <Spinner size={"lg"} />
          <span>Loading,,,</span>
        </div>
      )}
      <ModalForm
        className={"flex flex-col gap-4"}
        openModal={open}
        onCloseModal={() => setOpen(false)}
        title="Upload payment details"
      >
        <Input
          name="student ID"
          value={student?.id}
          disabled={true}
          setValue={setStudentId}
          type="text"
        />
        <FileInput
          name="payment Receipt"
          helperText="upload proof of payment"
          SetValue={setReceipt}
        />

        {uploadingReceipt ? (
          <Spinner className="text-end" size={"lg"} />
        ) : (
          <Button className="mt-4 w-fit place-self-end" onClick={() => uploadPayment()}>
            Upload
          </Button>
        )}
      </ModalForm>
      {gotPayments &&
        payments?.map((payment) => (
          <div className="flex w-full justify-center mb-2">
            <Card
              className="w-full"
              imgAlt="payment Receipt"
              imgSrc={`http://localhost:8000/uploads/payments/${payment?.paymentReceipt}`}
            >
              {/* <img src={`localhost:8000/uploads/payments/${payment?.paymentReceipt}`} alt="something" /> */}
              <span className="font-bold mb-2 mt-4">
                {" "}
                created at: {formatDate(payment.createdAt)}
              </span>
              <div className="flex flex-col">
                {payment.verified ? (
                  <span className="bg-green-200 p-2 text-center font-bold uppercase rounded-lg w-fit">
                    Verifed
                  </span>
                ) : (
                  <span className="bg-red-200 p-2 text-center font-bold uppercase rounded-lg w-fit">
                    pending
                  </span>
                )}
              </div>
            </Card>
          </div>
        ))}
    </>
  )
}
