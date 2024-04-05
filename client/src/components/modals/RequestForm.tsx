import { useEffect, useState } from "react";
import { Input, Select, Textarea } from "../form";
import ModalForm from "./ModalForm";
import { IChangeGradeRequest, IStudentGrade } from "../../api/types/grade.types";
import { Button } from "flowbite-react";
import { useStudentAuth } from "../../hooks/student.auth";

type RequestForm = {
  Open: boolean;
  onClose: () => void;
  student: IStudentGrade | null;
  ButtonClicked: (requestData: IChangeGradeRequest) => void;
}

const RequestForm = ({ Open, onClose, student, ButtonClicked }: RequestForm) => {

  useEffect(() => {
    setMid(student?.mid ?? 0);
    setFinal(student?.final ?? 0);
    setAssessment(student?.assessment ?? 0);
    setAttendance(student?.attendance[0]?.status ?? "");
    setGrade(student?.grade ?? "")
  }, [student])

  const { student: _student } = useStudentAuth();


  const [studentId, setStudentId] = useState<string>(_student?.id || "");
  const [teacherId, setTeacherId] = useState<string>();
  const [mid, setMid] = useState<number>(student?.mid ?? 0);
  const [final, setFinal] = useState<number>(student?.final ?? 0);
  const [assessment, setAssessment] = useState<number>(student?.assessment ?? 0);
  const [grade, setGrade] = useState<string>(student?.grade ?? "");
  const [attendance, setAttendance] = useState<string>(student?.attendance[0]?.status ?? "");
  const [message, setMessage] = useState<string>("");

  const Close = () => {
    setMessage("")
    onClose()
  }

  return (
    <ModalForm openModal={Open} onCloseModal={Close} title="Request Form" >
      <Input disabled={true} name="studentId" type="text" value={JSON.parse(localStorage.getItem('user')).id} setValue={setStudentId as any} />
      <Input name="Mid" type="number" value={mid} setValue={setMid as any} />
      <Input name="Final" type="number" value={final} setValue={setFinal as any} />
      <Input name="Assessment" type="number" value={assessment} setValue={setAssessment as any} />
      <Input name="Grade" type="text" value={grade} setValue={setGrade as any} />
      <Input name="Attendance" type="number" value={attendance} setValue={setAttendance as any} />
      <Textarea name="Request message" placeholder="purpose of request..." value={message} SetValue={setMessage} />

      <Button className="mt-4 w-full" onClick={() => ButtonClicked({
        studentId: student?.id ?? "",
        teacherId: student?.instructorID ?? "",
        grade: grade,
        mid: mid,
        final: final,
        assessment: assessment,
        attendance: attendance,
        course: student?.course,
        message: message
      })}>
        Send Request
      </Button>
      {/* Abel forgive me for I have sinned. */}
    </ModalForm>
  );
}
export default RequestForm;
