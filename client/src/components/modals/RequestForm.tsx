import { useState } from "react";
import { Input, Textarea } from "../form";
import ModalForm from "./ModalForm";

const RequestForm = () => {

    const [mid, setMid] = useState<number>(0);
    const [final, setFinal] = useState<number>(0);
    const [assessment, setAssessment] = useState<number>(0);

    const [message, setMessage] = useState<string>("");
    const onClose = () => {
        setMid(0);
        setFinal(0);
        setAssessment(0);
        setMessage("")
    }

    return (
        <ModalForm openModal onCloseModal={onClose} title="Request Form" >
            <Input name="Mid" type="number" value={mid} setValue={setMid} />
            <Input name="Mid" type="number" value={final} setValue={setFinal} />
            <Input name="Mid" type="number" value={assessment} setValue={setAssessment} />
            <Textarea name="Request message" placeholder="purpose of request..." value={message} SetValue={setMessage} />
        </ModalForm>
    );
}
export default RequestForm;