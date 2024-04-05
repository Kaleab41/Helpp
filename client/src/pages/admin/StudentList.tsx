import { IStudent } from "../../api/types/student.type"
import { Button } from "flowbite-react"
import { DashboardTable, LeftRightPageLayout, Card } from "../../components/shared/index"
import ModalForm from "../../components/modals/ModalForm"
import { ReadOnly } from "../../components/form/index"
import { useState } from "react"
import { Select } from "../../components/form/index"
import {
  useGenerateAttendanceExcelMutation,
  useGenerateBatchExcelMutation,
  useGetRestrictedAccountsQuery,
  useGetUnRestrictedStudentsInBatchQuery,
  useGetUniqueBatchesQuery,
  useRejectStudentMutation,
  useRestrictStudentMutation,
  useVerifyStudentMutation,
} from "../../api/slices/admin.slice"
import { toast } from "react-toastify"

export default function StudentList() {
  const [restrictedSearchTerm, SetRestrictedSearchTerm] = useState<string>("")
  const [nonRestrictedSearchTerm, SetNonRestrictedSearchTerm] = useState<string>("")
  const [openModal, SetOpenModal] = useState<boolean>(false)
  const [selectedBatchForAttendance, SetSelectedBatchForAttendance] = useState("")
  const [selectedBatchForExcelBatch, SetSelectedBatchForExcelBatch] = useState("")
  const [batchForExcelBatchFile, setBatchForExcelBatch] = useState<string | null>(null)
  const [batchForAttendance, setBatchForAttendance] = useState<string | null>(null)
  const [student, SetStudent] = useState<IStudent | null>(null)

  const { data: restrictedStudents } = useGetRestrictedAccountsQuery()
  const [verifyStudent] = useVerifyStudentMutation()
  const [restrictStudent] = useRestrictStudentMutation()
  const [rejectStudent] = useRejectStudentMutation()
  const [generateBatchExcel] = useGenerateBatchExcelMutation()
  const [generateAttendanceExcel] = useGenerateAttendanceExcelMutation()
  const { data: batches } = useGetUniqueBatchesQuery()
  const { data: unRestricted } = useGetUnRestrictedStudentsInBatchQuery()
  const RegisteredStudentTableHead = ["Name", "Email", "Phone"]

  const registredStudentTableData: { name: string; email: string; phone: number }[] =
    restrictedStudents?.map((student) => ({
      name: student.name,
      email: student.email,
      phone: student.phone,
    })) || []

  const unRestrictedTableData: { name: string; email: string; phone: number }[] =
    unRestricted?.map((student) => ({
      name: student.name,
      email: student.email,
      phone: student.phone,
    })) || []

  const SeeDetail = (row: number) => {
    if (!restrictedStudents) return
    SetStudent(restrictedStudents[row])
    SetOpenModal(true)
  }
  const SeeDetailunRestricted = (row: number) => {
    if (!unRestricted) return
    SetStudent(unRestricted[row])
    SetOpenModal(true)
  }

  const DelteStudent = async (id: string) => {
    if (!id) return
    const response = await rejectStudent({
      id,
    }).unwrap()
    if (response) {
      toast.success("Deleted Student")
      SetOpenModal(false)
    }
    else {
      toast.error("Student Deletion Failed, Please try again.")
    }
  }
  const ActivateStudent = async (id: string | undefined) => {
    if (!id) return
    const response = await verifyStudent({
      id,
    }).unwrap()
    if (response) {
      toast.success("Activated Student")
      SetOpenModal(false)
    }
    else {
      toast.error("Student Activation Failed, Please try again.")
    }
  }
  const DeactivateStudent = async (id: string | undefined) => {
    if (!id) return
    const response = await restrictStudent({
      id,
    }).unwrap()
    if (response) {
      toast.success("Deactivated Student")
      SetOpenModal(false)
    }
    else {
      toast.error("Student Deactivation Failed, Please try again.")
    }
  }
  const GenerateAttendance = async () => {
    if (selectedBatchForAttendance.length == 0) return
    const response = await generateAttendanceExcel({
      batch: selectedBatchForAttendance,
    }).unwrap()
    if (response) {
      setBatchForAttendance(response)
    }
  }
  const GenerateBatchExcel = async () => {
    if (selectedBatchForExcelBatch.length == 0) return
    const response = await generateBatchExcel({
      batch: selectedBatchForExcelBatch,
    }).unwrap()
    if (response) {
      setBatchForExcelBatch(response)
    }
  }

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
              <ReadOnly label="Name" value={student?.name} />
              <ReadOnly label="Gender" value={student?.gender} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ReadOnly label="Gurdian Name" value={student?.guardianName} />
              <ReadOnly label="Gurdian Phone" value={student?.guardianPhone} />
            </div>
            <ReadOnly label="Department" value={student?.department} />
            <ReadOnly label="About Student" value={student?.aboutYou} />
            {
              //TODO: change link
            }
            <ReadOnly
              label="Academic Record"
              link={`http://localhost:8000/uploads/files/${student?.academicRecord}`}
              value={
                <a href={`http://localhost:8000/uploads/files/${student?.academicRecord}`} download>
                  Record
                </a>
              }
            />
            <div className="flex justify-around mt-5">
              {!student?.restricted &&
                <button
                  onClick={() => DeactivateStudent(student?.id)}
                  className="text-red-500 border-2 rounded-lg p-2 hover:border-red-500 "
                >
                  Deactivate
                </button>
              }
              {student?.restricted &&
                <>
                  <button
                    onClick={() => ActivateStudent(student?.id)}
                    className="text-green-500 border-2 rounded-lg p-2 hover:border-green-500 "
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => DelteStudent(student?.id)}
                    className="text-red-500 border-red-500 border-2 rounded-lg p-2 hover:bg-red-100 "
                  >
                    Delete
                  </button>
                </>
              }

            </div>
          </ModalForm>
          <DashboardTable
            tableTitle="Ristrected Student List"
            headers={RegisteredStudentTableHead}
            tableData={registredStudentTableData as any}
            buttonLabel="See Detail"
            searchBy="name"
            searchByLabel="Student Name"
            searchTerm={restrictedSearchTerm}
            SetSearchTerm={SetRestrictedSearchTerm}
            ButtonClicked={(row) => {
              SeeDetail(row)
            }}
          />
          <DashboardTable
            tableTitle="Student List"
            headers={RegisteredStudentTableHead}
            tableData={unRestrictedTableData as any}
            buttonLabel="See Detail"
            searchBy="name"
            searchByLabel="Student Name"
            searchTerm={nonRestrictedSearchTerm}
            SetSearchTerm={SetNonRestrictedSearchTerm}
            ButtonClicked={(row) => {
              SeeDetailunRestricted(row)
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
                options={batches || []}
                setValue={SetSelectedBatchForAttendance}
              />
            </div>
            <Button onClick={async () => await GenerateAttendance()} outline size={"sm"}>
              Generate Attendance
            </Button>
            {batchForAttendance ? (
              <ReadOnly
                label="Academic Record"
                link={`http://localhost:8000/uploads/attendance/${batchForAttendance}`}
                value={
                  <a href={`http://localhost:8000/uploads/generate/${batchForAttendance}`} download>
                    Download
                  </a>
                }
              />
            ) : null}
          </Card>
          <Card cardTitle="Generate Batch Excel">
            <div className="pb-5">
              <Select
                name="Select Batch"
                options={batches || []}
                setValue={SetSelectedBatchForExcelBatch}
              />
            </div>
            <Button onClick={async () => await GenerateBatchExcel()} outline size={"sm"}>
              Generate Batch Excel
            </Button>
            {batchForExcelBatchFile ? (
              <ReadOnly
                label="Academic Record"
                link={`http://localhost:8000/uploads/generate/${batchForExcelBatchFile}`}
                value={
                  <a
                    href={`http://localhost:8000/uploads/generate/${batchForExcelBatchFile}`}
                    download
                  >
                    Download
                  </a>
                }
              />
            ) : null}
          </Card>
        </>
      }
    />
  )
}
