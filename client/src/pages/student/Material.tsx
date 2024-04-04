import { Button, Spinner } from "flowbite-react";
import { useGetMaterialsQuery } from "../../api/slices/student.slice";
import { DashboardTable } from "../../components/shared";
import { useState } from "react";
import ModalForm from "../../components/modals/ModalForm";
import { ReadOnly, Textarea } from "../../components/form";
import { IMaterials } from "../../api/types/material.types";
import { useUserAuth } from "../../hooks/user.auth";

export default function Material() {

  const { user: student } = useUserAuth();

  const handleClick = (index: number) => {
    setShowDetail(true);
    {
      materials &&
        setMaterialDetail(materials[index]);
    }
  }

  const { data: materials, isLoading: gettingMaterials, isSuccess: gotMaterials } = useGetMaterialsQuery(student ? student.batch : "");
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [materialDetail, setMaterialDetail] = useState<IMaterials | null>(null);

  const materialsTableFiltered = materials?.map(material => ({
    sender: material?.sender,
    file: material?.file.split("\\").pop(),
  }))

  return (
    <>
      {gettingMaterials &&
        <div className="flex justify-center items-center bg-gray-100 w-full h-[600px] justify-self-center gap-4 text-black text-lg font-bold">
          <Spinner size={"lg"} />
          <span>Loading...</span>
        </div>
      }
      {gotMaterials &&
        <DashboardTable tableTitle={`Material for DRB2401`} headers={["sender", "file"]} tableData={materialsTableFiltered} buttonLabel="show detail" ButtonClicked={(index) => handleClick(index)} />
      }
      {showDetail &&
        <ModalForm className="flex flex-col gap-4" openModal={showDetail} onCloseModal={() => setShowDetail(false)} title="Material Detail">
          <ReadOnly label="From" value={materialDetail?.sender} />
          <Textarea disable name="Message" value={materialDetail?.message} SetValue={() => { }} placeholder="" />
          <a target="_blank" href={`localhost:8000/${materialDetail?.file}`}>
            <Button size={"md"}>
              Download: {materialDetail?.file.split("\\").pop()}
            </Button>
          </a>
        </ModalForm>
      }
    </>
  );
}
