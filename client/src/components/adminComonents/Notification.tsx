import { useState } from "react"
import { Textarea } from "../../components/form/index"
import { Button } from "flowbite-react"
import { Card } from "../shared"
export default function Notification() {
  const [notification, SetNotification] = useState("")
  const HandleSendNotification = async () => {}
  return (
    <Card cardTitle="Notification">
      <Textarea
        name=""
        value={notification}
        SetValue={SetNotification}
        placeholder="Write notification to broadcast"
      />
      <Button onClick={HandleSendNotification}>Send Message</Button>
    </Card>
  )
}
