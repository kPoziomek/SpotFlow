import {HeaderActions} from "@/ui/spots/HeaderActions";
import {HeaderLocation} from "@/ui/spots/HeaderLocation";
import {Spot} from "@/types/types";

export default function SpotHeader ({spot}:{spot:Spot}) {
  const { name, country, region } = spot
  const location = region ? `${region}, ${country}` : country

  return (
    <header className="py-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">{name}</h1>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <HeaderLocation location={location} />
        <HeaderActions/>
      </div>
    </header>
  )
}
