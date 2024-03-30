    import { useState } from "react";
import { useApproveGradeChangeMutation, useGetGradeChangeRequestsQuery } from "../../api/slices/teacher.slice";
import ModalForm from "../../components/modals/ModalForm";
import { DashboardTable } from "../../components/shared";
import { ReadOnly, Textarea } from "../../components/form";
import { IGrade } from "../../api/types/grade.types";
import { Button } from "flowbite-react";

const Requests = () => {

    const handleClick = (index: number) => {
        if (requests) setRequest(requests[index]);
        SetOpen(true);
    }

    const handleApprove = () => {
        approveGrade({
            teacherId: "TRUX9279",
            requestId: request ? request.requestId : ""
        })
    }

    const [approveGrade, {}] = useApproveGradeChangeMutation();
    const {data: requests, isSuccess: gotRequests} = useGetGradeChangeRequestsQuery("TRUX9279");
    const notApprovedRequestsFilteredCols = requests?.map( request => ({
        sender: request.sender,
        course: request.course,
        mid: request.mid,
        final: request.final,
        assessment: request.assessment
    }))

    const [open, SetOpen] = useState(false);
    const [request, setRequest] = useState<IGrade | undefined>(undefined);

    return (
        <>
            {gotRequests &&
                <>
                <DashboardTable tableTitle="Grade Change Requests" headers={["sender", "course", "mid", "final", "assessment"]} tableData={notApprovedRequestsFilteredCols} buttonLabel="show detail" ButtonClicked={(index) => handleClick(index)} />

                <ModalForm openModal={open} onCloseModal={() => SetOpen(false)} title="Approve Change Request">
                    <ReadOnly label="mid" value={request?.mid} />
                    <ReadOnly label="final" value={request?.final} />
                    <ReadOnly label="assessment" value={request?.assessment} />
                    <Textarea name="student's message" value={request?.message} disable />
                    <div className="flex">
                        <Button className="w-full m-2 rounded-md" onClick={handleApprove}>
                            Approve
                        </Button>
                    </div>
                </ModalForm>
                </>
            }
        </>
    );
}

export default Requests;