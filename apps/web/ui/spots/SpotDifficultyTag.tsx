export default function SpotDifficultyTag({ spot }: { spot: { difficulty: 'beginner' | 'intermediate' | 'advanced' } }) {
  return (
    <div className="flex justify-between items-center">
            <span className={`px-2 py-1 text-xs rounded-md font-medium ${
              spot.difficulty === 'beginner' ? 'bg-teal-100 text-teal-700 border border-teal-200' :
                spot.difficulty === 'intermediate' ? 'bg-cyan-100 text-cyan-700 border border-cyan-200' :
                  'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {spot.difficulty}
            </span>

    </div>
  )
}
