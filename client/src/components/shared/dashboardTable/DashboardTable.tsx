import { Button, Table } from "flowbite-react"
import { ReactNode } from "react"

interface DashboardProps {
<<<<<<< HEAD
    headers: string[];
    tableData: Record<string, string>[];
    includedData: string[];
}

const handleButtonClick = (row: {}) => {
    console.log(row);
}


const DashboardTable = ({ headers, tableData, includedData }: DashboardProps) => {
    return (
        
            <div className="overflow-x-auto">
            <Table>
              <Table.Head className="text-base uppercase">
                {
                    headers.map((header: string) => (
                        <Table.HeadCell>{header}</Table.HeadCell>
                    ))
                }
              </Table.Head>
              <Table.Body className="divide-y"> 
                {
                    tableData.map((row, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {
                                Object.keys(row).map((key) => (
                                    includedData.some(data => data === key) ? <Table.Cell key={key} className="text-sm odd:font-bold odd:text-black">{row[key]}</Table.Cell> : null
                                ))
                            }
                            <Table.Cell key={`button-${index}`}>
                                <Button onClick={() => handleButtonClick(row)}>
                                    Request Change
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
              </Table.Body>
            </Table>
          </div>
        
    );
=======
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
>>>>>>> c612169 (Added custom custom action button as children)
}

export default DashboardTable
