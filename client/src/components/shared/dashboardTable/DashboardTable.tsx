import { Button, Table } from "flowbite-react"

interface DashboardProps {
  tableTitle: string
  headers: string[]
  tableData: Record<string, string>[]
  buttonLabel: string
  show: boolean
  ButtonClicked: (index: number) => void
}

const DashboardTable = ({
  tableTitle,
  headers,
  tableData,
  buttonLabel,
  show, 
  ButtonClicked,
}: DashboardProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <h1 className="text-2xl mt-5 mb-3 font-bold text-teal-700">{tableTitle}</h1>
      <div className="overflow-y-scroll max-h-80">
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
                  <Table.Cell key={key} className="odd:font-bold odd:text-sm text-black">
                    {row[key]}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  {show &&
                  <Button
                    outline
                    size={"sm"}
                      onClick={() => {
                        ButtonClicked(index)
                      }}
                    >
                      {buttonLabel}
                    </Button>
                  }
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
