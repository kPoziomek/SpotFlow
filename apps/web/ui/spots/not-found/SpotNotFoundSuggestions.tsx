export default function SpotNotFoundSuggestions () {
  return(
    <div className="mt-12 p-6 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-3">Sugestie:</h3>
      <ul className="text-sm text-gray-600 space-y-2">
        <li>• Sprawdź pisownię nazwy kraju lub miasta</li>
        <li>• Spróbuj z mniej specyficznymi filtrami</li>
        <li>• Poszukaj w pobliskich lokalizacjach</li>
      </ul>
    </div>
  )
}
