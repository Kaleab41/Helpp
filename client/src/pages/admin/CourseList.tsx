import { Button } from "flowbite-react"
import { ICourse, INewCourse } from "../../api/types/course.types"
import { Input, Select } from "../../components/form"
import { Card, DashboardTable, LeftRightPageLayout } from "../../components/shared"
import { useState } from "react"

const SampleCourseList: ICourse[] = [
  {
    _id: "1",
    courseid: "C001",
    courseName: "Introduction to Computer Science",
    year: 2022,
  },
  {
    _id: "2",
    courseid: "C002",
    courseName: "Data Structures and Algorithms",
    year: 2023,
  },
  {
    _id: "3",
    courseid: "C003",
    courseName: "Web Development Fundamentals",
    year: 2022,
  },
  {
    _id: "4",
    courseid: "C004",
    courseName: "Database Management Systems",
    year: 2023,
  },
]
const CourseListTableData: { courseId: string; courseName: string; year: string }[] =
  SampleCourseList.map((course) => ({
    courseId: course.courseid,
    courseName: course.courseName,
    year: course.year,
  }))
const CourseListTableHead = ["Code", "Name", "Year", ""]

// Functions - Kolo
const DeleteCourse = (id: string) => {}
const AssignCourse = (
  selectedTeacherForCourseAssignment: string,
  selectedCourseForCourseAssignment: string,
  selectedBatchForAttendance: string
) => {}
const AddCourse = (courseId: string, name: string, year: number | undefined) => {}

// Sample Data - Kolo
const CourseCodeList = ["", "C001", "C002", "C003", "C004"]
const TeacherEmailList = ["", "abebe@gmail.com", "kebede@gmail.com"]
const BatchList = ["", "DRB2401", "DRB1902"]

export default function CourseList() {
  const [selectedTeacherForCourseAssignment, SetSelectedTeacherForCourseAssignment] = useState("")
  const [selectedCourseForCourseAssignment, SetSelectedCourseForCourseAssignment] = useState("")
  const [selectedBatchForCourseAssignment, SetSelectedBatchForCourseAssignment] = useState("")
  const [courseId, SetCourseId] = useState<INewCourse["courseId"]>("")
  const [name, SetName] = useState<INewCourse["name"]>("")
  const [year, SetYear] = useState<INewCourse["year"]>()
  return (
    <LeftRightPageLayout
      leftChildren={
        <>
          <DashboardTable
            tableTitle="Course List"
            headers={CourseListTableHead}
            tableData={CourseListTableData}
            buttonLabel="Delete Course"
            ButtonClicked={(row) => {
              DeleteCourse(SampleCourseList[row]._id)
            }}
          />
        </>
      }
      rightChildren={
        <>
          <Card cardTitle={"Add Course"}>
            <div className="pb-5">
              <Input
                name={"Code"}
                placeholder="Enter course code"
                setValue={SetCourseId}
                type="text"
                value={courseId}
              />
              <Input
                name={"Name"}
                placeholder="Enter course name"
                setValue={SetName}
                type="text"
                value={name}
              />
              <Input
                name={"Year"}
                placeholder="Enter course year"
                setValue={SetYear}
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
