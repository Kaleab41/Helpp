import DashboardTable from "../../components/shared/dashboardTable/DashboardTable";
import { useChangeGradeRequestMutation, useFetchCoursesQuery, useGetGradeHistoryQuery, useGetMaterialsQuery, useGetNotificationsQuery, useGetPaymentHistoryQuery } from "../../api/slices/student.slice";
import RequestForm from "../../components/modals/RequestForm";
import { useState } from "react";
import { IChangeGradeRequest, IStudentGrade } from "../../api/types/grade.types";
import Notifications from "./Notifications";
import { Material, Payment } from "..";
import { IStudentCourse } from "../../api/types/student.type";

export default function StudentDash() {
  
  const { data: gradeHistory, isSuccess: gotGradeHistory } = useGetGradeHistoryQuery("QO1203");
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

  const filterColsGradeHistory = ["instructor", "course", "grade"]; // Corrected typo
  const filterColsCourses = ["courseName", "courseid", "credithour"];

  
  const filteredCourseData = coursesFiltered?.filter((data: IStudentCourse) => {
    return Object.keys(data).some(key => filterColsCourses.includes(key));
  }).map((data) => {
    return filterColsCourses.reduce((acc, key: string) => {
      (acc as any)[key] = (data as any)[key];
      return acc;
    }, {})
  }) || []
 
  const filteredTableData = gradeHistory?.filter(data => {
    return Object.keys(data).some(key => filterColsGradeHistory.includes(key));
  }).map((data: any) => {
    return filterColsGradeHistory.reduce((acc: Record<string, string>, key: string ) => {
      acc[key] = data[key];
      return acc;
    }, {});

  }) || []; // Apologies again, this was the best way I could figure out how to filter the columns
  
  // The ugly function above, reduces the columns to the ones we want (the ones in the header) from the fetched data. 


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
        <DashboardTable headers={["Instructor", "Course", "Grade"]} tableTitle="Grade history" tableData={filteredTableData} buttonLabel="Request Change" ButtonClicked={(index) => handleClick(index)} show />
        {gotGradeHistory && 
          <RequestForm Open={triggerModal} onClose={() => setTriggerModal(false)} student={student} ButtonClicked={(requestData: IChangeGradeRequest) => handleRequest(requestData)} />
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
