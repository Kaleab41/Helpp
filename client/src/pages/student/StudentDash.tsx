import DashboardTable from "../../components/shared/dashboardTable/DashboardTable";
import { useGetGradeHistoryQuery } from "../../api/slices/student.slice";

export default function StudentDash() {

  const { data: fetchData, isLoading, isSuccess, isError, error } = useGetGradeHistoryQuery("WI1830");

  console.log("Fetch", fetchData);

  const tableData = fetchData || [];

  return (

    <DashboardTable headers={["Instructor", "Course", "Grade"]} tableData={tableData} includedData={["instructor", "course", "grade"]} />

  );
}
