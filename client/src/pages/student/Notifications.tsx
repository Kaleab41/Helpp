import { Card } from "flowbite-react";
import { INotificationStudent } from "../../api/types/student.type";

const Notifications = ({notifications}: {notifications: INotificationStudent[]}) => {

    return (
        <Card className="max-w-sm shadow-none border-none">
            <div className="mb-4 flex flex-col items-start justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Notifications</h5>

                <div className="flex flex-col max-h-[270px] overflow-auto">
                    <ul className="flex flex-col mt-10 divide-y divide-gray-200 dark:divide-gray-700">
                    
                    { notifications.map((notification, index) => (  
                        <li key={index} className="py-3">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{notification.sender}</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{notification.message}</p>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
}

export default Notifications;