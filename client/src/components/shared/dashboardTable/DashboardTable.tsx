import { Button, Table } from "flowbite-react"
import { useEffect, useState } from "react"
import Empty from "../../../pages/Empty"

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
  //:TODO Test Logs
  
  const TaggedTableData = tableData.map((row, index) => {
    // console.log(row)
    // row['tag'] = index // pretty amazing solution, me like very much! ❤️
    return {
      ...row,
      tag: index
    }
  })

  useEffect(() => {
    if (!searchBy) return
    if (searchTerm === "") {
      SetFilteredData(tableData)
      return
    }

    SetFilteredData(
      TaggedTableData.filter((row: typeof tableData) => row[searchBy] ? row[searchBy].toLowerCase().includes(searchTerm?.toLowerCase()) : "")
    )
  }, [searchTerm])



  let dataToRender
  if (searchBy && searchTerm !== "") dataToRender = filteredData
  else dataToRender = TaggedTableData



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
            {(!dataToRender || dataToRender.length === 0) &&
              <div className="flex w-full justify-center p-20 h-[600px]">
                <Empty />
              </div>
            }
            {dataToRender.map((row: any, index: number) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                {Object.keys(row).map((key) => (
                  <Table.Cell key={key} className="odd:font-bold odd:text-sm text-black">
                    {key === "tag" ? "" : row[key]}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  {buttonLabel?.length > 0 && (
                    <Button
                      outline
                      size={"sm"}
                      onClick={() => {
                        ButtonClicked(row.tag, filteredData, searchBy)
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
