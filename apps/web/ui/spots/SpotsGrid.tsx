import {Spot} from "@/types/types";
import {SpotCard} from "@/ui/spots/SpotCard";


interface SpotsProps {
  spots: Spot[];
}

export function SpotsGrid({spots}: SpotsProps) {

  if(!spots) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">We could not find any spots. Please contact with admins</p>
      </div>
    )
  }

  if (spots.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No spots found matching your criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  )
}

