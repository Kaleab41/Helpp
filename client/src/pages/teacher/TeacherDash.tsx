import { useGetAllocatedCoursesQuery, useUploadAttendanceMutation, useUploadGradeMutation, useUploadMaterialMutation,} from "../../api/slices/teacher.slice";
import { DashboardTable, LeftRightPageLayout } from "../../components/shared";
import { Notification } from "../../components/adminComonents";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { FileInput, Input, Textarea } from "../../components/form";



export default function TeacherDash() {

  const handleUpload = (type: string) => {
    switch (type) {
      case "grades": {
        uploadGrades(grades);
        setGrades(null);
        break;
      }
      case "attendance": {
        uploadAttendance(attendance);
        break;
      }
      case "material": {
        uploadMaterial({
          batch: batch,
          file: material,
          message: message,
          sender: "Kaleab Mesfin" 
          // Change the sender later to whatever is in the user session
        })
      }
    }
  }

  const {data: allocatedCourses, isSuccess: gotAllocatedCourses, isLoading: gettingAllocatedCourses } = useGetAllocatedCoursesQuery("Abebehilcoe@gmail.co");
  const [uploadGrades, {isLoading: sendingGrades}] = useUploadGradeMutation();
  const [uploadAttendance, {isLoading: sendingAttendance}] = useUploadAttendanceMutation();
  const [uploadMaterial, {isLoading: sendingMaterial}] = useUploadMaterialMutation();

  const [grades, setGrades] = useState<File>(null);
  const [attendance, setAttendance] = useState<File | null>(null);
  const [material, setMaterial] = useState<File | null>(null);
  const [batch, setBatch] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  
  console.log(grades);
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
                <Input name="Batch" placeholder={"DRB1902"} value={batch} setValue={setBatch} />
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
                <FileInput helperText="upload attendance" SetValue={setAttendance}/>
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
