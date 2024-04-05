import { useState } from "react";
import { useListTeachersQuery, useVerifyTeacherMutation, useRejectTeacherMutation } from "../../api/slices/admin.slice";
import { DashboardTable } from "../../components/shared";
import { Button, Spinner } from "flowbite-react";
import ModalForm from "../../components/modals/ModalForm";
import { ReadOnly } from "../../components/form";
import { ITeacher } from "../../api/types/teacher.type";
import Empty from "../Empty";
import { toast } from "react-toastify";

const TeacherList = () => {

  const { data: teachers, isLoading: gettingTeachers, isSuccess: gotTeachers } = useListTeachersQuery();
  const [approveTeacher, { isLoading: verifyingTeacher, isSuccess: teacherVerified }] = useVerifyTeacherMutation();
  const [rejectTeacher, { isLoading: rejectingTeacher, isSuccess: teacherRejected }] = useRejectTeacherMutation();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [showForm, setShowForm] = useState(false);
  const [teacher, setTeacher] = useState<ITeacher | null>(null);
  // const teachersList = teachers?.filter( teacher => !teacher.restricted);
  const filteredTeachersList = teachers?.map(teacher => ({
    id: teacher?.id,
    name: teacher?.name,
    email: teacher?.email,
    restricted: teacher?.restricted ? "YES" : "NO"
  }))

  const handleClick = (index: number, filteredData: any[], searchBy) => {
    setShowForm(true);
    (teachers && filteredData.length === 0) && setTeacher(teachers[index]); // PS this solution assumes that the data passed to the table and data retreived from API are the same in length
    (teachers && filteredData.length > 0) &&
      setTeacher(teachers.filter(teacher => teacher[searchBy] == filteredData[index][searchBy])[0]);

    // Do not question the ugliness above, it is 2:00 AM and my brain is running on coffee and the love of my parents
    // Basically we're sorting through the original array which resides here then we check the filteredData (returned from the DashboardTable component) and by utilizing the searchBy keyword we look for the entry in the filtered list that matches the one in the original,
    // We do this because only the original Array has access to all the other data that we excluded when rendering the array on the table.
    // I have a kind of solution, that I will try for refactoring later.
    // This should do for now.
    // When the data is searched through, the list becomes shorter but the indexes aren't updated
  }
  2

  const DeleteTeacher = async (id: string) => {
    try {
      const response = await rejectTeacher({ id }).unwrap()
      console.log(response)
      if (response) toast.success("Teacher Deleted")
    } catch (error) {
      toast.error("Deletion Failed, Please try agian.")
    }
  }
  return (
    <div>
      {gettingTeachers &&
        <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold">
          <Spinner />
          <span>Loading...</span>
        </div>
      }

      {!teachers &&
        <Empty />
      }

      {gotTeachers &&

        <>
          <DashboardTable
            headers={["id", "name", "email", "restricted"]}
            tableTitle="Teacher's List"
            tableData={filteredTeachersList}
            buttonLabel="Show Details"
            ButtonClicked={(index, filteredData, searchBy) => handleClick(index, filteredData, searchBy)}
            searchBy={"name"}
            searchByLabel={"Teacher Name"}
            searchTerm={searchTerm}
            SetSearchTerm={setSearchTerm}
          />

          <ModalForm className={""} openModal={showForm} onCloseModal={() => setShowForm(false)} title="Teacher Details">
            <ReadOnly label="id" value={teacher?.id} />
            <ReadOnly label="name" value={teacher?.name} />
            <ReadOnly label="email" value={teacher?.email} />
            <ReadOnly label="restricted" value={teacher?.restricted ? "YES" : "NO"} />
            <ReadOnly label="phone" value={teacher?.phone} />
            <ReadOnly label="Assigned Courses" value={
              <div className="flex w-fit flex-wrap gap-3">
                {teacher?.assignedCourses.map(course =>
                  <span className="p-2 bg-red-100 font-bold text-md flex w-fit rounded-lg">{course}</span>
                )}
              </div>
            } />

            {teacher?.restricted ?
              verifyingTeacher ?

                <div className="text-end">
                  <Spinner size={"lg"} />
                </div> :
                <Button onClick={() => approveTeacher({ email: teacher?.email })}>
                  Approve
                </Button>
              :

              <div className="flex justify-center">
                <Button outline color={"failure"} onClick={() => DeleteTeacher(teacher!.id)}>Delete</Button>
              </div>
            }
          </ModalForm>
        </>
      }
    </div>
  );
}

export default TeacherList;
