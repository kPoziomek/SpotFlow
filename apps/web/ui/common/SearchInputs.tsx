import { SlMagnifier } from "react-icons/sl";
import SearchSelect from "@/ui/common/SearchSelect";


export default function SearchInputs (){
return(
  <div className="flex items-stretch justify-center">
    <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 max-w-2xl w-full">
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-800 mb-1">Where</label>
        <input
          type="text"
          name="country"
          placeholder="Search destinations"
          className="w-full text-sm text-gray-700 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0"
        />
      </div>
      <div className="w-px min-h-0 h-full bg-gray-300"></div>
      <SearchSelect/>
      <button
        type="submit"
        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white p-3 rounded-full mr-2 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-cyan-200"
      >
        <SlMagnifier className="w-4 h-4" />
      </button>
    </div>
  </div>
)
}
