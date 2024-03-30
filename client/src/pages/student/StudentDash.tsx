import DashboardTable from "../../components/shared/dashboardTable/DashboardTable";
import { useChangeGradeRequestMutation, useFetchCoursesQuery, useGetGradeHistoryQuery, useGetMaterialsQuery, useGetNotificationsQuery, useGetPaymentHistoryQuery } from "../../api/slices/student.slice";
import RequestForm from "../../components/modals/RequestForm";
import { useState } from "react";
import { IChangeGradeRequest, IStudentGrade } from "../../api/types/grade.types";
import Notifications from "./Notifications";
import { LeftRightPageLayout } from "../../components/shared";
import { Spinner } from "flowbite-react";

export default function StudentDash() {
  
  const { data: gradeHistory, isLoading: gettingGradeHistory, isSuccess: gotGradeHistory, error: gradesError } = useGetGradeHistoryQuery("WI1830");
  const { data: notifications, isLoading: gettingNotiications, isSuccess: gotNotifications } = useGetNotificationsQuery("WI1830");
  const { data: courses, isLoading: gettingCourses, isSuccess: gotCourses} = useFetchCoursesQuery("WI1830");
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
 
    <LeftRightPageLayout leftChildren = {
      <div className="flex flex-col w-full">
        {gettingGradeHistory && 
          <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold">
            <Spinner />
            <span>Loading...</span>
          </div>
        }
        {gotGradeHistory &&
          <>
            <DashboardTable headers={["Instructor", "Course", "Grade"]} tableTitle="Grade history" tableData={filteredTableData} buttonLabel="Request Change" ButtonClicked={(index) => handleClick(index)} show />
          
            <RequestForm Open={triggerModal} onClose={() => setTriggerModal(false)} student={student} ButtonClicked={(requestData: IChangeGradeRequest) => handleRequest(requestData)} />
          </>
        }
        {gradesError && <span>error!</span>}

        {gettingCourses &&
          <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold mt-2">
            <Spinner />
            <span>Loading...</span>
          </div>
        }
        {gotCourses &&
          <DashboardTable headers={["course name", "course ID", "credit hour"]} tableTitle="Current courses" tableData={filteredCourseData} />
        }
      </div>
    }
    rightChildren =  {

          <div className="flex flex-col w-[400px] gap-4">
            {gettingNotiications && 
              <div className="flex justify-center items-center bg-gray-100 w-full h-[270px] justify-self-center gap-4 text-black text-lg font-bold">
                <Spinner />
                <span>Loading...</span>
              </div>
            }
            {gotNotifications &&
              <Notifications notifications={notificationsArray} />
            }

            

          </div>
    } />
    
  );
}
