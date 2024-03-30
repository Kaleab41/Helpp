import { Button, Table } from "flowbite-react"

interface DashboardProps {
  tableTitle: string
  headers: string[]
  tableData: any
  buttonLabel: string
  ButtonClicked: (index: number) => void
}

const DashboardTable = ({
  tableTitle,
  headers,
  tableData,
  buttonLabel,
  ButtonClicked,
}: DashboardProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <h1 className="text-2xl mt-5 mb-3 font-bold text-teal-700">{tableTitle}</h1>
      <div className="overflow-y-scroll max-h-[600px]">
        <Table>
          <Table.Head>
            {headers.map((header: string, index) => (
              <Table.HeadCell key={index}>{header}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {tableData.map((row: any, index: number) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {Object.keys(row).map((key) => (
                  <Table.Cell key={key} className="odd:font-bold odd:text-sm text-black">
                    {row[key]}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  {buttonLabel?.length > 0 && (
                    <Button
                      outline
                      size={"sm"}
                      onClick={() => {
                        ButtonClicked(index)
                      }}
                    >
                      {buttonLabel}
                    </Button>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default DashboardTable
