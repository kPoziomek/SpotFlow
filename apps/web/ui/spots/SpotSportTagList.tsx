export default function SpotSportTagList({ spot }: { spot: { sports: string[] } }) {
  return <div className="flex flex-wrap gap-1 mb-3">
    {spot.sports.slice(0, 2).map((sport) => (
      <span
        key={sport}
        className="px-2 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs rounded-md font-medium">
        {sport}
      </span>
    ))}
    {spot.sports.length > 2 && (
      <span className="px-2 py-1 bg-cyan-50 text-cyan-600 border border-cyan-200 text-xs rounded-md">
        +{spot.sports.length - 2}
      </span>
    )}
  </div>
}
