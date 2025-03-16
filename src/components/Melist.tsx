import { HeartIcon } from "@heroicons/react/24/outline";

interface MelistProps {
    displayMode: string;
  }
function Melist({ displayMode } : MelistProps) {
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-116">
            <div className="flex gap-4">
                <div className="bg-white rounded-full size-12" />
                <div>
                    <div className="font-bold text-xl">Kylie Jenner</div>
                    <div className="text-xs">24 products</div>
                    {/* on this */}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex">
                    <div className="bg-white size-14 rounded-l-md"></div>
                    <div className="bg-gray-200 w-full rounded-r-md"></div>
                </div>
                <div className="flex">
                    <div className="bg-white size-14 rounded-l-md"></div>
                    <div className="bg-gray-200 w-full rounded-r-md"></div>
                </div>
                <div className="flex">
                    <div className="bg-white size-14 rounded-l-md"></div>
                    <div className="bg-gray-200 w-full rounded-r-md"></div>
                </div>
            </div>
            <div className="flex gap-4">
                {displayMode == "condensed" && (
                    <>
                        <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</div>
                        <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
                    </>
                )}
            </div>
        </div>
    )   
}

export default Melist