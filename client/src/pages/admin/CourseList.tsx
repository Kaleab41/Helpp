import { ToastContainer, toast } from "react-toastify"
import { Button } from "flowbite-react"
import { INewCourse } from "../../api/types/course.types"
import { Input, Select } from "../../components/form"
import { Card, DashboardTable, LeftRightPageLayout } from "../../components/shared"
import { useState } from "react"
import {
  useAddCourseMutation,
  useAssignCourseMutation,
  useDeleteCourseMutation,
  useGetCourseListQuery,
  useGetUniqueBatchesQuery,
  useListTeachersQuery,
} from "../../api/slices/admin.slice"
export default function CourseList() {
  const [selectedTeacherForCourseAssignment, SetSelectedTeacherForCourseAssignment] = useState("")
  const [selectedCourseForCourseAssignment, SetSelectedCourseForCourseAssignment] = useState("")
  const [selectedBatchForCourseAssignment, SetSelectedBatchForCourseAssignment] = useState("")
  const [courseId, SetCourseId] = useState<INewCourse["courseId"]>("")
  const [name, SetName] = useState<INewCourse["name"]>("")
  const [year, SetYear] = useState<INewCourse["year"]>()
  const [searchTerm, SetSearchTerm] = useState<string>("")

  const { data: courseList } = useGetCourseListQuery()
  const [addCourse, { error: addCouseError }] = useAddCourseMutation()
  const [deleteCourse, { error: deleteCourseError }] = useDeleteCourseMutation()
  const { data: teachers } = useListTeachersQuery()
  const { data: batches } = useGetUniqueBatchesQuery()
  const [assignCourse, { error: assignCourseError }] = useAssignCourseMutation()

  const CourseListTableHead = ["courseid", "courseName", "year"]

  const CourseListTableData =
    courseList
      ?.filter((payment) => {
        return Object.keys(payment).some((key) => CourseListTableHead.includes(key))
      })
      .map((data: any) => {
        return CourseListTableHead.reduce((acc: Record<string, string>, key: string) => {
          acc[key] = data[key]
          return acc
        }, {})
      }) || []

  const DeleteCourse = async (id: string) => {
    const response = await deleteCourse({ courseid: id }).unwrap()
    if (response) {
      toast.success(response.message)
    } else if (deleteCourseError) toast.error("Deleteing course failed, Please try again")
  }
  const AssignCourse = async (
    selectedTeacherForCourseAssignment: string,
    selectedCourseForCourseAssignment: string,
    selectedBatchForAttendance: string
  ) => {
    const response = await assignCourse({
      email: selectedTeacherForCourseAssignment,
      course: selectedCourseForCourseAssignment,
      batch: selectedBatchForAttendance,
    }).unwrap()
    if (response) {
      toast.success(response.message)
    } else if (assignCourseError) toast.error("Assinging couse failed, Please try again")
  }
  const AddCourse = async (courseId: string, name: string, year: number | undefined) => {
    if (!courseId || !name || !year) {
      toast.warn("Please fill all fileds")
      return
    }
    const response = await addCourse({ courseId, name, year }).unwrap()
    if (response) {
      SetCourseId("")
      SetName("")
      SetYear(undefined)
      toast.success("Couse Added Successfuly ")
    } else if (addCouseError) toast.error("Course Adding Failed")
  }

  // Sample Data - Kolo
  const CourseCodeList = courseList?.map((payment) => payment.courseid) || []
  const TeacherEmailList = teachers?.map((teacher) => teacher.email) || []
  const BatchList = batches || []
  return (
    <LeftRightPageLayout
      leftChildren={
        <>
          {courseList && (
            <DashboardTable
              tableTitle="Course List"
              headers={CourseListTableHead}
              tableData={CourseListTableData}
              buttonLabel="Delete Course"
              searchBy="courseName"
              searchByLabel="Course Name"
              searchTerm={searchTerm}
              SetSearchTerm={SetSearchTerm}
              ButtonClicked={(row) => {
                DeleteCourse(courseList[row].courseid)
              }}
            />
          )}
        </>
      }
      rightChildren={
        <>
          <Card cardTitle={"Add Course"}>
            <div className="pb-5">
              <Input
                name={"Code"}
                placeholder="Enter course code"
                setValue={SetCourseId as any}
                type="text"
                value={courseId}
              />
              <Input
                name={"Name"}
                placeholder="Enter course name"
                setValue={SetName as any}
                type="text"
                value={name}
              />
              <Input
                name={"Year"}
                placeholder="Enter course year"
                setValue={SetYear as any}
                type="text"
                value={year}
              />
            </div>
            <Button
              outline
              onClick={() => {
                AddCourse(courseId, name, year)
              }}
            >
              Add Course
            </Button>
          </Card>
          <Card cardTitle={"Assign Course"}>
            <div className="pb-5">
              <Select
                name={"Course"}
                options={CourseCodeList}
                setValue={SetSelectedCourseForCourseAssignment}
              />
              <Select
                name={"Teacher"}
                options={TeacherEmailList}
                setValue={SetSelectedTeacherForCourseAssignment}
              />
              <Select
                name={"Batch"}
                options={BatchList}
                setValue={SetSelectedBatchForCourseAssignment}
              />
            </div>
            <Button
              outline
              onClick={() => {
                AssignCourse(
                  selectedTeacherForCourseAssignment,
                  selectedCourseForCourseAssignment,
                  selectedBatchForCourseAssignment
                )
              }}
            >
              Assign Course
            </Button>
          </Card>
        </>
      }
    />
  )
}
