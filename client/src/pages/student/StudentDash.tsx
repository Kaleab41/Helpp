import DashboardTable from "../../components/shared/dashboardTable/DashboardTable";

export default function StudentDash() {
  return (
    <DashboardTable headers={["Name", "Date", "Age"]} tableData={[
      {name: "James", Date: "Date?", Age: "200"},
      {name: "James", Date: "Date?", Age: "200"},
      {name: "Fuhad", Date: "Date?", Age: "200"}

    ]}/>
  );
}
