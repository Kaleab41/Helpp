import DashboardTable from "../../components/shared/dashboardTable/DashboardTable";
import { useChangeGradeRequestMutation, useGetGradeHistoryQuery, useGetNotificationsQuery } from "../../api/slices/student.slice";
import RequestForm from "../../components/modals/RequestForm";
import { useState } from "react";
import { IChangeGradeRequest, IStudentGrade } from "../../api/types/grade.types";
import Notifications from "./notifications";

export default function StudentDash() {

  const { data: fetchData, isLoading, isSuccess, isError, error } = useGetGradeHistoryQuery("WI1830");
  const { data: notifications, isLoading: pending, isSuccess: success } = useGetNotificationsQuery("WI1830");

  const data = notifications ? notifications["notifications"] : [];
  // make the WI1830 Id dynamic by fetching it for the current user within the session instead of feeding it to the query manually like I did up here.
  // use QO1203 for requesting change

  const [createRequest, {}] = useChangeGradeRequestMutation();
  const [triggerModal, setTriggerModal] = useState<boolean>(false);
  const [student, setStudent] = useState<IStudentGrade | null>(null);

  const filterCols = ["instructor", "course", "grade"]; // Corrected typo

  const filteredTableData = fetchData?.filter(data => {
    return Object.keys(data).some(key => filterCols.includes(key));
  }).map((data: any) => {
    return filterCols.reduce((acc: Record<string, string>, key: string ) => {
      acc[key] = data[key];
      // acc.push(data[key]);
      return acc;
    }, {});

  }) || []; // Apologies again, this was the best way I could figure out how to filter the columns
  
  // The ugly function above, reduces the columns to the ones we want (the ones in the header) from the fetched data. 


  const handleClick = (index: number) => {
    setTriggerModal(true);
    setStudent(fetchData ? fetchData[index] : null)
  }

  const handleRequest = (requestData: IChangeGradeRequest) => {
     createRequest(requestData)
  }



  return (
 
    <div className="flex">
      <DashboardTable headers={["Instructor", "Course", "Grade"]} tableData={filteredTableData} buttonLabel="Request Change" ButtonClicked={(index) => handleClick(index)} />
      {isSuccess && 
        <RequestForm Open={triggerModal} onClose={() => setTriggerModal(false)} student={student} ButtonClicked={(requestData: IChangeGradeRequest) => handleRequest(requestData)} />
      }
      <div className="flex flex-col w-[400px] border-l-2">
        {success &&
          <Notifications notifications={data} />
        }
      </div>
    </div>
  );
}
