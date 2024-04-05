import { useState } from "react";
import { useApproveGradeChangeMutation, useGetGradeChangeRequestsQuery } from "../../api/slices/teacher.slice";
import ModalForm from "../../components/modals/ModalForm";
import { DashboardTable } from "../../components/shared";
import { ReadOnly, Textarea } from "../../components/form";
import { IGrade } from "../../api/types/grade.types";
import { Button, Spinner } from "flowbite-react";
import { useTeacherAuth } from "../../hooks/teacher.auth";
import LoadingButton from "../../components/shared/LoadingButton";
import { toast } from "react-toastify";

const Requests = () => {

    const { teacher } = useTeacherAuth();
    //TODO: if teacher is not logged in, redirect to login
    console.log({ id: teacher?.id });

    const handleClick = (index: number) => {
        if (requests) setRequest(requests[index]);
        SetOpen(true);
    }

    const handleApprove = () => {
        approveGrade({
            teacherId: teacher?.id || "",
            requestId: request ? request.requestId : ""
        })

        toast.success("Grades Approved Successfully!")
        {gradeApproved && SetOpen(false)}
        
    }



    const [approveGrade, { isLoading: approvingGrade, isSuccess: gradeApproved }] = useApproveGradeChangeMutation();
    const { data: requests, isLoading: gettingRequests, isSuccess: gotRequests } = useGetGradeChangeRequestsQuery(teacher?.id || "TRAG8336");

    const notApprovedRequestsFilteredCols = requests?.map(request => ({
        sender: request.sender,
        course: request.course,
        mid: request.mid,
        final: request.final,
        assessment: request.assessment,
        grade: request.grade
    }))


    const [open, SetOpen] = useState(false);
    const [request, setRequest] = useState<IGrade | undefined>(undefined);

    return (
        <>
            {gettingRequests &&
                <div className="flex justify-center items-center bg-gray-100 w-full h-[270px] justify-self-center gap-4 text-black text-lg font-bold">
                    <Spinner />
                    <span>Loading...</span>
                </div>
            }
            {gotRequests &&
                <>
                    <DashboardTable tableTitle="Grade Change Requests" headers={["sender", "course", "mid", "final", "assessment", "grade"]} tableData={notApprovedRequestsFilteredCols} buttonLabel="show detail" ButtonClicked={(index) => handleClick(index)} />

                    <ModalForm openModal={open} onCloseModal={() => SetOpen(false)} title="Approve Change Request">
                        <ReadOnly label="Mid" value={request?.mid} />
                        <ReadOnly label="Final" value={request?.final} />
                        <ReadOnly label="Assessment" value={request?.assessment} />
                        <ReadOnly label="Grade" value={request?.grade} />
                        <Textarea name="Student's message" value={request?.message} disable />
                        <div className="flex">
                            {approvingGrade ?
                                <LoadingButton label="Approve" loading={approvingGrade} type="button" />
                                :
                                <Button className="w-full m-2 rounded-md" onClick={handleApprove}>
                                    Approve
                                </Button>
                            }
                        </div>
                    </ModalForm>
                </>
            }
        </>
    );
}

export default Requests;