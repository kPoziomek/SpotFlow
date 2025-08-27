import {HeaderActions} from "@/components/spots/HeaderActions";
import {HeaderLocation} from "@/components/spots/HeaderLocation";
import {Spot} from "@/types/types";

export default function SpotHeader ({spot}:{spot:Spot}) {
  const { name, country, region } = spot
  const location = region ? `${region}, ${country}` : country

  return (
    <header className="py-4">
      {/* Spot name */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">{name}</h1>

      {/* Location and rating info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <HeaderLocation location={location} />
        {/* Action buttons */}
        <HeaderActions/>
      </div>
    </header>
  )
}
