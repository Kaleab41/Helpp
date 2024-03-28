import { Table } from "flowbite-react"
import { ReactNode } from "react"

interface DashboardProps {
  headers: string[]
  tableData: Record<string, string>[]
  children?: ReactNode
}

const DashboardTable = ({ headers, tableData, children }: DashboardProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          {headers.map((header: string, index) => (
            <Table.HeadCell key={index}>{header}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {tableData.map((row, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              {Object.keys(row).map((key) => (
                <Table.Cell>{row[key]}</Table.Cell>
              ))}
              <Table.Cell>{children}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default DashboardTable
