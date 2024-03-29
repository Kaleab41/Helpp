import { IRegistrationStudent } from "../../api/types/student.type"
import { Button, Label } from "flowbite-react"
import { DashboardTable, LeftRightPageLayout, Card } from "../../components/shared/index"
import ModalForm from "../../components/modals/ModalForm"
import { ReadOnly } from "../../components/form/index"
import { useState } from "react"
import { Select } from "../../components/form/index"

export default function StudentList() {
  const [openModal, SetOpenModal] = useState<boolean>(false)
  const [selectedBatchForAttendance, SetSelectedBatchForAttendance] = useState("")
  const [selectedBatchForExcelBatch, SetSelectedBatchForExcelBatch] = useState("")
  const [student, SetStudent] = useState<IRegistrationStudent>({
    name: "",
    gender: "",
    email: "",
    phone: "",
    guardianName: "",
    guardianPhone: "",
    aboutYou: "",
    department: "",
    academicRecord: null,
  })

  const RegisteredStudentTableHead = ["Name", "Email", "Phone", ""]
  // Sample Data - Kolo
  const RegisteredStudentList: IRegistrationStudent[] = [
    {
      name: "John Doe",
      gender: "Male",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      guardianName: "Jane Doe",
      guardianPhone: "987-654-3210",
      aboutYou: "I am passionate about learning and exploring new things.",
      department: "Computer Science",
      academicRecord: null,
    },
    {
      name: "Jane Smith",
      gender: "Female",
      email: "janesmith@example.com",
      phone: "111-222-3333",
      guardianName: "Jack Smith",
      guardianPhone: "333-222-1111",
      aboutYou: "I love art and enjoy painting in my free time.",
      department: "Fine Arts",
      academicRecord: null,
    },
    {
      name: "Michael Johnson",
      gender: "Male",
      email: "michaelj@example.com",
      phone: "555-666-7777",
      guardianName: "Michelle Johnson",
      guardianPhone: "777-666-5555",
      aboutYou: "I am a sports enthusiast and play basketball competitively.",
      department: "Physical Education",
      academicRecord: null,
    },
    {
      name: "Emily Davis",
      gender: "Female",
      email: "emilyd@example.com",
      phone: "444-333-2222",
      guardianName: "Edward Davis",
      guardianPhone: "222-333-4444",
      aboutYou: "I enjoy reading novels and writing short stories.",
      department: "English Literature",
      academicRecord: null,
    },
    {
      name: "Emily Davis",
      gender: "Female",
      email: "emilyd@example.com",
      phone: "444-333-2222",
      guardianName: "Edward Davis",
      guardianPhone: "222-333-4444",
      aboutYou: "I enjoy reading novels and writing short stories.",
      department: "English Literature",
      academicRecord: null,
    },
    {
      name: "Emily Davis",
      gender: "Female",
      email: "emilyd@example.com",
      phone: "444-333-2222",
      guardianName: "Edward Davis",
      guardianPhone: "222-333-4444",
      aboutYou: "I enjoy reading novels and writing short stories.",
      department: "English Literature",
      academicRecord: null,
    },
    {
      name: "Emily Davis",
      gender: "Female",
      email: "emilyd@example.com",
      phone: "444-333-2222",
      guardianName: "Edward Davis",
      guardianPhone: "222-333-4444",
      aboutYou: "I enjoy reading novels and writing short stories.",
      department: "English Literature",
      academicRecord: null,
    },
    {
      name: "Emily Davis",
      gender: "Female",
      email: "emilyd@example.com",
      phone: "444-333-2222",
      guardianName: "Edward Davis",
      guardianPhone: "222-333-4444",
      aboutYou: "I enjoy reading novels and writing short stories.",
      department: "English Literature",
      academicRecord: null,
    },
    {
      name: "Emily Davis",
      gender: "Female",
      email: "emilyd@example.com",
      phone: "444-333-2222",
      guardianName: "Edward Davis",
      guardianPhone: "222-333-4444",
      aboutYou: "I enjoy reading novels and writing short stories.",
      department: "English Literature",
      academicRecord: null,
    },
    {
      name: "Emily Davis",
      gender: "Female",
      email: "emilyd@example.com",
      phone: "444-333-2222",
      guardianName: "Edward Davis",
      guardianPhone: "222-333-4444",
      aboutYou: "I enjoy reading novels and writing short stories.",
      department: "English Literature",
      academicRecord: null,
    },
  ]
  const RegistredStudentTableData: { name: string; email: string; phone: string }[] =
    RegisteredStudentList.map((student) => ({
      name: student.name,
      email: student.email,
      phone: student.phone,
    }))

  const SeeDetail = (row: number) => {
    const {
      name,
      gender,
      email,
      phone,
      guardianName,
      guardianPhone,
      aboutYou,
      department,
      academicRecord,
    } = RegisteredStudentList[row]
    SetStudent({
      name,
      gender,
      email,
      phone,
      guardianName,
      guardianPhone,
      aboutYou,
      department,
      academicRecord,
    })
    SetOpenModal(true)
  }

  // Functions - Kolo
  // TODO: We need render activate and deactie based on student activatio status
  const DelteStudent = (email: string) => {}
  const ActivateStudent = (email: string) => {}
  const DeactivateStudent = (email: string) => {}
  const GenerateAttendance = () => {}
  const GenerateBatchExcel = () => {}

  return (
    <LeftRightPageLayout
      leftChildren={
        <>
          <ModalForm
            openModal={openModal}
            onCloseModal={() => SetOpenModal(false)}
            title="Student Detail"
          >
            <div className="grid grid-cols-2 gap-2">
              <ReadOnly label="Name" value={student.name} />
              <ReadOnly label="Gender" value={student.gender} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ReadOnly label="Gurdian Name" value={student.guardianName} />
              <ReadOnly label="Gurdian Phone" value={student.guardianPhone} />
            </div>
            <ReadOnly label="Department" value={student.department} />
            <ReadOnly label="About Student" value={student.aboutYou} />
            <ReadOnly label="Academic Record" link="/" value={<a>Record</a>} />
            <div className="flex justify-around mt-5">
              <button
                onClick={() => ActivateStudent(student.email)}
                className="text-green-500 border-2 rounded-lg p-2 hover:border-green-500 "
              >
                Activate
              </button>
              <button
                onClick={() => DeactivateStudent(student.email)}
                className="text-red-500 border-2 rounded-lg p-2 hover:border-red-500 "
              >
                Deactivate
              </button>
              <button
                onClick={() => DelteStudent(student.email)}
                className="text-red-500 border-red-500 border-2 rounded-lg p-2 hover:bg-red-100 "
              >
                Delete
              </button>
            </div>
          </ModalForm>
          <DashboardTable
            tableTitle="Ristrected Student List"
            headers={RegisteredStudentTableHead}
            tableData={RegistredStudentTableData}
            buttonLabel="See Detail"
            ButtonClicked={(row) => {
              SeeDetail(row)
            }}
          />
          <DashboardTable
            tableTitle="Student List"
            headers={RegisteredStudentTableHead}
            tableData={RegistredStudentTableData}
            buttonLabel="See Detail"
            ButtonClicked={(row) => {
              SeeDetail(row)
            }}
          />
        </>
      }
      rightChildren={
        <>
          <Card cardTitle="Generate Attendance">
            <div className="pb-5">
              <Select
                name="Select Batch"
                options={["DRB2401", "DRB1902"]}
                setValue={SetSelectedBatchForAttendance}
              />
            </div>
            <Button onClick={() => GenerateAttendance} outline size={"sm"}>
              Generate Attendance
            </Button>
          </Card>
          <Card cardTitle="Generate Batch Excel">
            <div className="pb-5">
              <Select
                name="Select Batch"
                options={["DRB2401", "DRB1902"]}
                setValue={SetSelectedBatchForExcelBatch}
              />
            </div>
            <Button onClick={() => GenerateBatchExcel} outline size={"sm"}>
              Generate Batch Excel
            </Button>
          </Card>
        </>
      }
    />
  )
}
