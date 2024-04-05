import { useGetAllocatedCoursesQuery, useUploadAttendanceMutation, useUploadGradeMutation, useUploadMaterialMutation, } from "../../api/slices/teacher.slice";
import { DashboardTable, LeftRightPageLayout } from "../../components/shared";
import { Notification } from "../../components/adminComponents";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { FileInput, Select, Textarea } from "../../components/form";
import { useGetUniqueBatchesQuery } from "../../api/slices/admin.slice";
import { useTeacherAuth } from "../../hooks/teacher.auth";
import { toast } from "react-toastify";



export default function TeacherDash() {

  const { teacher } = useTeacherAuth();
  //TODO: if teacher is not logged in, redirect to login

  const { data: allocatedCourses, isSuccess: gotAllocatedCourses, isLoading: gettingAllocatedCourses } = useGetAllocatedCoursesQuery(teacher?.email || "Abebehilcoe@gmail.com");
  const [uploadGrades, { isLoading: sendingGrades }] = useUploadGradeMutation();
  const [uploadAttendance, { isLoading: sendingAttendance }] = useUploadAttendanceMutation();
  const [uploadMaterial, { isLoading: sendingMaterial }] = useUploadMaterialMutation();

  const [grades, setGrades] = useState<File | null>(null);
  const [attendance, setAttendance] = useState<File | null>(null);
  const [material, setMaterial] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const { data: batches } = useGetUniqueBatchesQuery();
  const [selectedBatch, SetSelectedBatchForCourseAssignment] = useState("")

  const handleUpload = async (type: string) => {
    switch (type) {
      case "grades": {
        if (!grades) return;
        try {
          const response = await uploadGrades(grades);
          setGrades(null);
          if (response) toast.success("Upload Successful")
        } catch (error: any) {
          toast.error(error?.data.error)
        }
        break;
      }
      case "attendance": {
        if (!attendance) return;
        try {
          const response = await uploadAttendance(attendance);
          if (response) toast.success("Upload Successful")
        } catch (error: any) {
          toast.error(error?.data.error)
        }
        break;
      }
      case "material": {
        if (!material) return;
        try {
          const response = await
            uploadMaterial({
              batch: selectedBatch,
              file: material,
              message: message,
              sender: teacher?.name || "Teacher"
            })
          if (response) toast.success("Upload Successful")
        } catch (error: any) {
          toast.error(error?.data.error)
        }
      }
    }
  }


  return (
    <div>
      <LeftRightPageLayout
        leftChildren={
          <>
            {gettingAllocatedCourses &&
              <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold">
                <Spinner />
                <span>Loading...</span>
              </div>
            }

            {gotAllocatedCourses &&
              <DashboardTable headers={["course name", "course code", "batch"]} tableData={allocatedCourses} />
            }
          </>
        }

        rightChildren={
          <>
            <Notification sender={teacher?.name} />

            <div className="w-full flex flex-col gap-8 divide-y">

              <p className="text-lg text-black">Upload grades</p>
              <FileInput helperText="file name must be in the format: [teacher name]-[course ID]-[batch]" SetValue={setGrades} />
              {sendingGrades ?
                <div className="text-end">
                  <Spinner />
                </div> :
                <Button className="w-fit place-self-end" onClick={() => handleUpload("grades")}>Upload</Button>
              }

              <div className="w-full flex flex-col">
                <p className="text-lg text-black">Upload Material</p>
                <Select
                  name={"Batch"}
                  options={batches || []}
                  setValue={SetSelectedBatchForCourseAssignment}
                />
                <Textarea name="message" placeholder="write your message here" value={message} SetValue={setMessage} />
                <FileInput name="Materials" helperText="upload your material(s)" SetValue={setMaterial} />
                {sendingMaterial ?
                  <div className="text-end">
                    <Spinner />
                  </div> :
                  <Button className="w-fit place-self-end" onClick={() => handleUpload("material")}>Upload</Button>
                }
              </div>

              <div className="flex flex-col w-full">
                <p className="text-lg text-black">Upload Attendance</p>
                <FileInput helperText="upload attendance" SetValue={setAttendance} />
                {sendingAttendance ?
                  <div className="text-end">
                    <Spinner />
                  </div>
                  :
                  <Button className="w-fit place-self-end" onClick={() => handleUpload("attendance")}>Upload</Button>
                }
              </div>
            </div>

            {/* <ModalForm title="Upload your files" openModal={Open} onCloseModal={onClose}> */}
          </>
        }
      />
    </div>

  )

}
