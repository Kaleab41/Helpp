import { Button, Table } from "flowbite-react";


interface DashboardProps {
    headers: string[];
    tableData: Record<string, string>[];
    includedData: string[];
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
                            <Table.Cell>
                                <Button>Click</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
              </Table.Body>
            </Table>
          </div>
        
    );
}

export default DashboardTable;