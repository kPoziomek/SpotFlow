export default function SearchInputs (){
return(
  <div className="flex items-stretch justify-center">
    <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 max-w-2xl w-full">
      <div>

      </div>
      {/* Location Input */}
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-800 mb-1">Where</label>
        <input
          type="text"
          name="country"
          placeholder="Search destinations"
          className="w-full text-sm text-gray-700 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Divider */}
      <div className="w-px min-h-0 h-full bg-gray-300"></div>

      {/* Sport Filter */}
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-800 mb-1">Sport</label>
        <select
          name="sport"
          className="w-full text-sm text-gray-700 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer"
        >
          <option value="">All sports</option>
          <option value="windsurfing">Windsurfing</option>
          <option value="kitesurfing">Kitesurfing</option>
          <option value="surfing">Surfing</option>
          <option value="sup">SUP</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white p-3 rounded-full mr-2 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-cyan-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  </div>
)
}
