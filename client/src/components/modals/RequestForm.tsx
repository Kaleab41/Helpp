import { useEffect, useState } from "react";
import { Input, Textarea } from "../form";
import ModalForm from "./ModalForm";
import { IChangeGradeRequest, IStudentGrade } from "../../api/types/grade.types";
import { Button } from "flowbite-react";

type RequestForm = {
    Open: boolean;
    onClose: () => void;
    student: IStudentGrade | null;
    ButtonClicked: (requestData: IChangeGradeRequest) => void;
}

const RequestForm = ({Open, onClose, student, ButtonClicked}: RequestForm) => {

    useEffect(() => {
        setMid(student?.mid ?? 0);
        setFinal(student?.final ?? 0);
        setAssessment(student?.assessment ?? 0);
        setGrade(student?.grade ?? "")
    }, [student])


    const [mid, setMid] = useState<number>(student?.mid ?? 0);
    const [final, setFinal] = useState<number>(student?.final ?? 0);
    const [assessment, setAssessment] = useState<number>(student?.assessment ?? 0);
    const [grade, setGrade] = useState<string>(student?.grade ?? "");
    const [message, setMessage] = useState<string>("");

    const Close = () => {
        setMessage("")
        onClose()
    }

    return (
        <ModalForm openModal={Open} onCloseModal={Close} title="Request Form" >
            <Input name="Mid" type="number" value={mid} setValue={setMid as any} />
            <Input name="Final" type="number" value={final} setValue={setFinal as any} />
            <Input name="Assessment" type="number" value={assessment} setValue={setAssessment as any} />
            <Input name="Grade" type="text" value={grade} setValue={setGrade as any} />
            <Textarea name="Request message" placeholder="purpose of request..." value={message} SetValue={setMessage} />

            <Button className="mt-4 w-full" onClick={() => ButtonClicked({
                studentId: student?.id ?? "",
                teacherId: student?.instructorID ?? "TRAG8336",
                // NOTE: teacherId will be empty because most of the DB right now doesn't pass this
                grade: grade,
                mid: mid,
                final: final,
                assessment: assessment,
                message: message
            })}>
                Send Request
            </Button>
            {/* Abel forgive me for I have sinned. */}
        </ModalForm>
    );
}
export default RequestForm;