import { useState } from "react"
import { Input, Textarea } from "../../components/form/index"
import { Button } from "flowbite-react"
import { Card } from "../shared"
import { useSendNotificationMutation } from "../../api/slices/admin.slice"
export default function Notification() {
  const [notification, SetNotification] = useState("")
  const [sender, SetSender] = useState("")
  const [sendNotification, { isLoading }] = useSendNotificationMutation();

  const HandleSendNotification = async () => {
    const response = await sendNotification({
      sender: sender,
      message: notification
    }).unwrap();
    if (response) {
      SetNotification("")
      SetSender("")
    }
  }
  return (
    <Card cardTitle="Notification">
      <Input
        name=""
        value={sender}
        setValue={SetSender as any}
        type="text"
        placeholder="Sender"
      />
      <Textarea
        name=""
        value={notification}
        SetValue={SetNotification}
        placeholder="Write notification to broadcast"
      />
      <Button disabled={isLoading} onClick={HandleSendNotification}>Send Message</Button>
    </Card>
  )
}
