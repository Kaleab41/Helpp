import { useState } from "react"
import { Textarea } from "../../components/form/index"
import { Button } from "flowbite-react"
export default function Notification() {
  const [notification, SetNotification] = useState("")
  const HandleSendNotification = async () => {}
  return (
    <div className="space-y-2  p-2 w-full rounded-md border-b-2 shadow-md bg-gray-50">
      <Textarea
        name="Notification"
        value={notification}
        SetValue={SetNotification}
        placeholder="Write notification to broadcast"
      />
      <Button onClick={HandleSendNotification}>Send Message</Button>
    </div>
  )
}
