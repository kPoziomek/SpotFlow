import { FaMapMarkerAlt } from 'react-icons/fa'
import SpotNotFoundSuggestions from "@/ui/spots/not-found/SpotNotFoundSuggestions";
import SpotNotFoundActions from "@/ui/spots/not-found/SpotNotFoundActions";
import SpotNotFoundDescription from "@/ui/spots/not-found/SpotNotFoundDescription";
import SpotNotFoundHeader from "@/ui/spots/not-found/SpotNotFoundHeader";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center">
            <FaMapMarkerAlt className="w-10 h-10 text-cyan-500" />
          </div>
        </div>
        <SpotNotFoundHeader title="Nie znaleziono spotów" />
        <SpotNotFoundDescription description="Nie mogliśmy znaleźć żadnych spotów pasujących do Twoich kryteriów wyszukiwania.
          Spróbuj zmienić filtry lub wyszukaj w innej lokalizacji."/>
        <SpotNotFoundActions/>
        <SpotNotFoundSuggestions />

      </div>
    </div>
  )
}
