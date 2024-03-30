import DashboardTable from "../../components/shared/dashboardTable/DashboardTable";
import { useChangeGradeRequestMutation, useFetchCoursesQuery, useGetGradeHistoryQuery, useGetMaterialsQuery, useGetNotificationsQuery, useGetPaymentHistoryQuery } from "../../api/slices/student.slice";
import RequestForm from "../../components/modals/RequestForm";
import { useState } from "react";
import { IChangeGradeRequest, IStudentGrade } from "../../api/types/grade.types";
import Notifications from "./Notifications";
import { Material, Payment } from "..";

export default function StudentDash() {
  
  const { data: gradeHistory, isSuccess: gotGradeHistory } = useGetGradeHistoryQuery("WI1830");
  const { data: notifications, isSuccess: gotNotifications } = useGetNotificationsQuery("WI1830");
  const { data: payments, isSuccess: gotPayments } = useGetPaymentHistoryQuery("WI1830");
  const { data: materials, isSuccess: gotMaterials } = useGetMaterialsQuery("DRB2401");
  const { data: courses, isSuccess: gotCourses} = useFetchCoursesQuery("WI1830");
  // Get the batch from the student's session also
  
  
  const coursesFiltered = courses?.filter(data => data.status);
  const notificationsArray = notifications ? notifications["notifications"] : [];
  // make the WI1830 Id dynamic by fetching it for the current user within the session instead of feeding it to the query manually like I did up here.
  // use QO1203 for requesting change of grades ( it's the only one that retrieves grade history with the instructor's id included. )

  const [createRequest, {}] = useChangeGradeRequestMutation();
  const [triggerModal, setTriggerModal] = useState<boolean>(false);
  const [student, setStudent] = useState<IStudentGrade | null>(null);

  const filteredCourseData = coursesFiltered?.map((course) => (
    {
      courseName: course?.courseName,
      courseid: course?.courseid,
      credithour: course?.credithour
    }
  ))

  const filteredTableData = gradeHistory?.map(history => (
    {
      instructor: history.instructor,
      course: history.course,
      grade: history.grade
    }
  ))

  const handleClick = (index: number) => {
    setTriggerModal(true);
    setStudent(gradeHistory ? gradeHistory[index] : null)
  }

  const handleRequest = (requestData: IChangeGradeRequest) => {
     createRequest(requestData)
  }


  return (
 
    <div className="flex">
      <div className="flex flex-col w-full">
        {gotGradeHistory &&
          <>
            <DashboardTable headers={["Instructor", "Course", "Grade"]} tableTitle="Grade history" tableData={filteredTableData} buttonLabel="Request Change" ButtonClicked={(index) => handleClick(index)} show />
          
            <RequestForm Open={triggerModal} onClose={() => setTriggerModal(false)} student={student} ButtonClicked={(requestData: IChangeGradeRequest) => handleRequest(requestData)} />
          </>
        }

        {gotCourses &&
          <DashboardTable headers={["course name", "course ID", "credit hour"]} tableTitle="Current courses" tableData={filteredCourseData} />
        }
      </div>

      <div className="flex flex-col w-[400px] border-l-2">
        {gotNotifications &&
          <Notifications notifications={notificationsArray} />
        }
        {gotMaterials && 
          <Material materials={materials} />
        }
        {gotPayments &&
          <Payment payments={payments} />
        }
      </div>
    </div>
  );
}
