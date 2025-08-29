import { FaExclamationTriangle } from 'react-icons/fa'
import PopularSpotsList from "@/ui/spots/not-found/PopularSpotsList";
import SpotNotFoundActions from "@/ui/spots/not-found/SpotNotFoundActions";
import SpotNotFoundHeader from "@/ui/spots/not-found/SpotNotFoundHeader";
import SpotNotFoundDescription from "@/ui/spots/not-found/SpotNotFoundDescription";

export default function SpotNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="w-10 h-10 text-cyan-500" />
          </div>
        </div>
        <SpotNotFoundHeader title="Spot nie istnieje"/>
        <SpotNotFoundDescription description="Spot, którego szukasz mógł zostać usunięty lub zmienił adres.
          Sprawdź czy URL jest poprawny lub wróć do przeglądania wszystkich spotów."/>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SpotNotFoundActions/>
        </div>
        <PopularSpotsList/>
      </div>
    </div>
  )
}
