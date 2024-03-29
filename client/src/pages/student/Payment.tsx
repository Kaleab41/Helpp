import { Card } from "flowbite-react";
import { IPayment } from "../../api/types/payment.types";

export default function Payment({payments}: {payments: IPayment[]}) {
  return (
    <Card className="max-w-sm shadow-none border-none">
            <div className="mb-4 flex flex-col items-start justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Notifications</h5>

                <div className="flex flex-col max-h-[270px] overflow-auto">
                    <ul className="flex flex-col mt-10 divide-y divide-gray-200 dark:divide-gray-700">
                    
                    { payments.map((payment) => (  
                        <li className="py-3">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{payment.verified ? "Completed" : "Canceled"}</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{payment.studentName}</p>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </Card>
  );
}
