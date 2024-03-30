import { Card } from "flowbite-react";
import { useGetPaymentHistoryQuery } from "../../api/slices/student.slice";

export default function Payment() {

    const formatDate = (date: string) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    }

    

    const { data: payments, isLoading: gettingPayments, isSuccess: gotPayments } = useGetPaymentHistoryQuery("WI1830");
    const paymentsFiltered = payments?.map( payment => ({
        id: payment?.id,
        paymentReceipt: payment?.paymentReceipt,
        verified: payment?.verified,
        createdAt: payment?.createdAt,
        udpatedAt: payment?.updatedAt
    }))

    return (
        <>
            {gotPayments &&
                paymentsFiltered?.map( payment => (
                    <div className="grid grid-col-gap-4">
                        <Card className="max-w-lg gap-4" imgAlt="payment Receipt" imgSrc={`localhost:8000/uploads/payments/${payment.paymentReceipt}`}>
                            <span className="font-bold mb-2 mt-4"> created at: { formatDate(payment.createdAt)}</span>
                            <div className="flex flex-col">
                                { payment.verified ? <span className="bg-red-100 p-2 text-center font-bold uppercase rounded-lg w-fit">canceled</span> : <span className="bg-green-100 p-2 text-center font-bold uppercase rounded-lg w-fit">canceled</span>}
                            </div>

                        </Card>
                    </div>
                ))
            }
        </>
    );
}
