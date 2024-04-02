import { Button, Table } from "flowbite-react"
import { useEffect, useState } from "react"

interface DashboardProps {
  tableTitle: string
  headers: string[]
  tableData: any
  buttonLabel: string
  ButtonClicked: (index: number, filteredData: any[], searchBy: string) => void
  // Search
  searchBy?: string
  searchByLabel?: string
  searchTerm?: string
  SetSearchTerm?: (term: string) => void
}

const DashboardTable = ({
  tableTitle,
  headers,
  tableData,
  buttonLabel,
  ButtonClicked,
  searchBy,
  searchByLabel,
  searchTerm,
  SetSearchTerm,
}: DashboardProps) => {
  const [filteredData, SetFilteredData] = useState<typeof tableData>(tableData)
  useEffect(() => {
    if (!searchBy) return
    if (searchTerm === "") {
      SetFilteredData(tableData)
      return
    }

    SetFilteredData(
      tableData.filter((row: typeof tableData) => row[searchBy] ? row[searchBy].toLowerCase().includes(searchTerm?.toLowerCase()) : "")
      // Remove this and substitute for tableData.filter((row: typeof tableData) => row[searchBy].toLowerCase().includes(searchTerm?.toLowerCase()) )
      // I used the above so that the program doesn't crash if any of the objects have undefined fields
      // In the real app, I don't think we'll have undefined fields ( I hope )

    )
  }, [searchTerm])

  let dataToRender
  if (searchBy && searchTerm !== "") dataToRender = filteredData
  else dataToRender = tableData

  return (
    <div className="w-full overflow-x-auto">
      <h1 className="text-2xl mt-5 mb-3 font-bold text-teal-700">{tableTitle}</h1>
      <div className="overflow-y-scroll max-h-[600px]">
        {searchBy && (
          <div className="flex justify-end p-3">
            <input
              onChange={(e) => SetSearchTerm(e.target.value)}
              type="text"
              className="block  text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-teal-500 focus:border-teal-500 "
              placeholder={`Search by ${searchByLabel}`}
            ></input>
          </div>
        )}
        <Table>
          <Table.Head>
            {headers.map((header: string, index) => (
              <Table.HeadCell key={index}>{header}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {dataToRender.map((row: any, index: number) => (
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
                        ButtonClicked(index, filteredData, searchBy)
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
