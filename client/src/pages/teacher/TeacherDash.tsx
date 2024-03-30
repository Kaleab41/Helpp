import { useGetAllocatedCoursesQuery, useGetGradeChangeRequestsQuery } from "../../api/slices/teacher.slice";
import { DashboardTable, LeftRightPageLayout } from "../../components/shared";
import { Notification } from "../../components/adminComonents";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import ModalForm from "../../components/modals/ModalForm";
export default function TeacherDash() {

  const {data: allocatedCourses, isSuccess: gotAllocatedCourses, isLoading: gettingAllocatedCourses } = useGetAllocatedCoursesQuery("Abebehilcoe@gmail.co");

  const [grades, setGrades] = useState<File>(null);
  const [attendance, setAttendance] = useState<File>(null);
  const [material, setMaterial] = useState<File>(null);

  return (
    <div>
      <LeftRightPageLayout
        leftChildren={
          <>
          {gettingAllocatedCourses &&
            <div className="flex justify-center items-center bg-gray-100 w-full h-[400px] justify-self-center gap-4 text-black text-lg font-bold">
              <Spinner />
              <span>Loading...</span>
            </div>
          }

          {gotAllocatedCourses &&
           <DashboardTable headers={["course name", "credit hour", "batch"]} tableData={allocatedCourses} /> 
          }
          </>
        }

        rightChildren = {
          <>
            <Notification />

            <div className="w-full flex flex-col gap-2 divide-y">
              <p className="text-lg text-black">Upload grades</p>
              <Button outline className="max-w-fit">
                Upload
              </Button>

              <p className="text-lg text-black">Upload Material</p>
              <Button outline className="max-w-fit">
                Upload
              </Button>

              <p className="text-lg text-black">Upload Attendance</p>
              <Button outline className="max-w-fit">
                Upload
              </Button>
            </div>

            {/* <ModalForm title="Upload your files" openModal={Open} onCloseModal={onClose}> */}
          </>
        }
        />
    </div>
    
  )
    
}
