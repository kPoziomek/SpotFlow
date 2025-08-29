import {RiStarFill} from "react-icons/ri";
interface Props {
  spot: {
    region?: string
    country: string
  }
}

export default function SpotLocationAndRating ({ spot }: Props) {
 return( <div className="flex items-center justify-between mb-1">
    <p className="text-gray-600 text-sm font-medium">
      {spot.region ? `${spot.region}, ` : ''}{spot.country}
    </p>
    <div className="flex items-center text-sm">
      <RiStarFill className="w-4 h-4 text-yellow-400"/>
      {/*add ranking from db*/}
      <span className="ml-1 text-gray-700">4.8 </span>
    </div>
  </div>)
}
