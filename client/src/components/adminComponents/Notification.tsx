import { useState } from "react"
import { Input, Select, Textarea } from "../form/index"
import { Button } from "flowbite-react"
import { Card } from "../shared"
import { useSendNotificationMutation } from "../../api/slices/teacher.slice"
import { useGetUniqueBatchesQuery } from "../../api/slices/admin.slice"
import { toast } from "react-toastify"
export default function Notification({ sender }: { sender?: string | null }) {
  const [notification, SetNotification] = useState("")
  const [_sender, SetSender] = useState(sender || "")
  const [sendNotification, { isLoading }] = useSendNotificationMutation();
  const { data: batches } = useGetUniqueBatchesQuery();
  const [selectedBatchForCourseAssignment, SetSelectedBatchForCourseAssignment] = useState("")



  const HandleSendNotification = async () => {
    const response = await sendNotification({
      batch: selectedBatchForCourseAssignment,
      sender: _sender,
      message: notification
    }).unwrap();
    if (response) {
      SetNotification("")
      SetSender("")
      toast.success("Notification sent!")
    }
  }
  return (
    <Card cardTitle="Notification">
      <Select
        name={"Batch"}
        options={batches || []}
        setValue={SetSelectedBatchForCourseAssignment}
      />
      <Input
        name=""
        value={_sender}
        setValue={SetSender as any}
        type="text"
        placeholder="Sender" helperText={""} />
      <Textarea
        name=""
        value={notification}
        SetValue={SetNotification}
        placeholder="Write notification to broadcast" disable={false} />
      <Button disabled={isLoading} onClick={HandleSendNotification}>Send Message</Button>
    </Card>
  )
}
