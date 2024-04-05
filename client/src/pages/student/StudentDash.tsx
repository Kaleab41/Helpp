'use-strict'
import DashboardTable from "../../components/shared/dashboardTable/DashboardTable"
import {
  useChangeGradeRequestMutation,
  useFetchCoursesQuery,
  useGenerateTranscriptQuery,
  useGetGradeHistoryQuery,
  useGetNotificationsQuery,
} from "../../api/slices/student.slice"
import RequestForm from "../../components/modals/RequestForm"
import { useState } from "react"
import { IChangeGradeRequest, IStudentGrade } from "../../api/types/grade.types"
import Notifications from "./Notifications"
import { Card, LeftRightPageLayout } from "../../components/shared"
import { Button, Spinner } from "flowbite-react"
import { INotificationStudent } from "../../api/types/student.type"
import { toast } from "react-toastify"
import { useUserAuth } from "../../hooks/user.auth"

export default function StudentDash() {
  const { user: student } = useUserAuth()
  const { data: transcript, isLoading: gettingTranscript, isSuccess: gotTranscript } = useGenerateTranscriptQuery({ id: student ? student.id : "" })

  const [transcriptlink, setTranscriptlink] = useState<string | null>(null);
  const handleTranscript = () => {

    function escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    function replaceAll(str: string, find: string, replace: string) {
      return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    try {
      if (transcript) {
        const fixedFilePath = transcript.url.startsWith('../') ? transcript.url.slice(3) : transcript.url;
        const url = `localhost:8000/${fixedFilePath.replace('..', "")}`;
        // window.open(url);
        setTranscriptlink("http://" + url.replace(new RegExp(escapeRegExp("\\"), 'g'), "/"))
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'transcript.pdf';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Failed to fetch transcript PDF:', error);
    }
  }



  const {
    data: gradeHistory,
    isLoading: gettingGradeHistory,
    isSuccess: gotGradeHistory,
    error: gradesError,
  } = useGetGradeHistoryQuery(student?.id as any)


  const {
    data: notifications,
    isLoading: gettingNotiications,
    isSuccess: gotNotifications,
  } = useGetNotificationsQuery(student?.id || "")
  const {
    data: courses,
    isLoading: gettingCourses,
    isSuccess: gotCourses,
  } = useFetchCoursesQuery(student?.id || "")
  // Get the batch from the student's session also

  const coursesFiltered = courses?.filter((data) => data.status)

  const notificationsArray = notifications
    ? notifications["notifications" as any]
    : ([] as INotificationStudent[])
  // const notificationsArray: INotificationStudent[] = Array.isArray(notifications) ? notifications : [notifications];
  // make the WI1830 Id dynamic by fetching it for the current user within the session instead of feeding it to the query manually like I did up here.
  // use QO1203 for requesting change of grades ( it's the only one that retrieves grade history with the instructor's id included. )

  const [createRequest, { }] = useChangeGradeRequestMutation()
  // const response = useGenerateTranscriptQuery({ id: student ? student.id : "" });

  // console.log(generateTranscript({ id: student?.id || ""}), "hello")

  const [triggerModal, setTriggerModal] = useState<boolean>(false)
  const [studentGrade, setStudentGrade] = useState<IStudentGrade | null>(null)

  const filteredCourseData = coursesFiltered?.map((course) => ({
    courseName: course?.courseName,
    courseid: course?.courseid,
    credithour: course?.credithour,
  }))

  const filteredTableData = gradeHistory?.map((history) => ({
    instructor: history.instructor,
    course: history.course,
    grade: history.grade,
    attendance: history.attendance[0]?.status ? history.attendance[0].status : "NA"
  }))

  const handleClick = (index: number) => {
    setTriggerModal(true)
    setStudentGrade(gradeHistory ? gradeHistory[index] : null)
  }

  const handleRequest = async (requestData: IChangeGradeRequest) => {
    try {
      const response = await createRequest(requestData).unwrap()
      if (response) {
        toast.success("Request Sent Successfully")
      }
    } catch (error: any) {
      toast.error(error.error)
    }
  }

  return (
    <LeftRightPageLayout
      leftChildren={
        <div className="flex flex-col w-full">
          {gettingGradeHistory && (
            <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold">
              <Spinner />
              <span>Loading...</span>
            </div>
          )}



          {gotGradeHistory && (
            <>
              <DashboardTable
                headers={["Instructor", "Course", "Grade", "Attendance"]}
                tableTitle="Grade history"
                tableData={filteredTableData}
                buttonLabel="Request Change"
                ButtonClicked={(index) => handleClick(index)}
              />

              <RequestForm
                Open={triggerModal}
                onClose={() => setTriggerModal(false)}
                student={studentGrade}
                ButtonClicked={(requestData: IChangeGradeRequest) => handleRequest(requestData)}
              />
            </>
          )}

          {gettingCourses && (
            <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold mt-2">
              <Spinner />
              <span>Loading...</span>
            </div>
          )}

          {gotCourses && (
            <DashboardTable
              headers={["course name", "course ID", "credit hour"]}
              tableTitle="Current courses"
              tableData={filteredCourseData}
              buttonLabel=""
              ButtonClicked={() => { }}
            />
          )}


        </div>
      }
      rightChildren={
        <div>
          <div className="flex flex-col w-[400px] gap-4">
            {gettingNotiications && (
              <div className="flex justify-center items-center bg-gray-100 w-full h-[270px] justify-self-center gap-4 text-black text-lg font-bold">
                <Spinner />
                <span>Loading...</span>
              </div>
            )}
            {gotNotifications && <Notifications notifications={notificationsArray} />}
          </div>
          <Card cardTitle="Generate Transcript">
            {/* TODO: Get student id from session and set it here */}


            <Button
              outline
              onClick={handleTranscript}
            >
              Generate Transcript
            </Button>

            {transcriptlink ? <a href={transcriptlink} target={"_blank"} type={"application/octet-stream"} download={"Transcript"}>
              Download
            </a> : null}


          </Card>
        </div>
      }
    />
  )
}
