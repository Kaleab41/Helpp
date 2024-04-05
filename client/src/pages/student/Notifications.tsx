import { Card } from "flowbite-react"
import { INotificationStudent } from "../../api/types/student.type"
import { Icon } from "@iconify/react/dist/iconify.js"

const Notifications = ({ notifications }: { notifications: INotificationStudent[] }) => {
  return (
    <Card className="max-w-sm shadow-none border-none">
      <div className="mb-4 flex flex-col items-start justify-between">
        <h5 className="text-xl font-bold leading-none text-teal-600 dark:text-white">
          Notifications
        </h5>

        <div className="flex flex-col max-h-[270px] overflow-auto w-[400px]">
          <ul className="flex flex-col mt-10 divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notification, index) => (
              <div className={`flex mb-2 p-1 items-center w-fit ${notification.tone === "Negative" ? ' bg-red-50  rounded-lg' : ''}`}>
                <li key={index} className="py-2 px-2 mr-10">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {notification.sender}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {notification.message}
                    </p>
                  </div>
                </li>
                {notification.tone === "Negative" &&
                  <Icon icon="iwwa:delete" className=" font-bold text-xl text-red-500" />
                }
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}

export default Notifications
