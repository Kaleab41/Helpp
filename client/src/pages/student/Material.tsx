import { Card } from "flowbite-react";
import { IMaterials } from "../../api/types/material.types";

export default function Material({materials}: {materials: IMaterials[]}) {

  return (
    <Card className="max-w-sm shadow-none border-none">
            <div className="mb-4 flex flex-col items-start justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Materials</h5>

                <div className="flex flex-col max-h-[270px] overflow-auto">
                    <ul className="flex flex-col mt-10 divide-y divide-gray-200 dark:divide-gray-700">
                    
                    { materials.map((material, index) => (  
                        <li key={index} className="py-3">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{material.sender}</p>
                                <a className="truncate text-sm text-gray-500 dark:text-gray-400" href={material.file}>{material.file}</a>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </Card>
  );
}
