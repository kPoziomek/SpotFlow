export default function SearchSelect (){
  return <div className="flex-1 px-6 py-3">
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

}
