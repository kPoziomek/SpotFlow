import { RiStarFill } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";

export function HeaderLocation({location}: {location: string}) {
  return (
    <div className="flex items-center text-sm text-gray-600 space-x-4">
    <div className="flex items-center">
      <RiStarFill className="w-4 h-4 text-yellow-400"/>
      <span className="font-semibold text-gray-900">4.8</span>
    <span className="mx-1">·</span>
  <button className="underline hover:text-gray-800">127 reviews</button>
  </div>

  <div className="flex items-center">
    <GrLocation className="w-4 h-4 text-gray-600" />
    <span>{location}</span>
    </div>
    </div>

  )
}
