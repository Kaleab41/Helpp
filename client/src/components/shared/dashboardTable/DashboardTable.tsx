import { Button, Table } from "flowbite-react";


interface DashboardProps {
    headers: string[];
    tableData: Record<string, string>[];
}


const DashboardTable = ({ headers, tableData }: DashboardProps) => {
    return (
        
            <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                {
                    headers.map((header: string) => (
                        <Table.HeadCell>{header}</Table.HeadCell>
                    ))
                }
              </Table.Head>
              <Table.Body className="divide-y"> 
                {
                    tableData.map((row) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            {
                                Object.keys(row).map((key) => (
                                    <Table.Cell>{row[key]}</Table.Cell>
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