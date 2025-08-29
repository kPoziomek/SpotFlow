import { RiShareLine,RiHeartLine } from "react-icons/ri";

export  function HeaderActions (){
  return(
    <div className="flex items-center space-x-4">
      <button className="flex items-center space-x-2 px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200">
        <RiShareLine className="w-4 h-4 text-cyan-600" />
        <span className="text-sm font-semibold text-cyan-700">Share</span>
      </button>

      <button className="flex items-center space-x-2 px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200">
        <RiHeartLine className="w-4 h-4 text-cyan-600" />
        <span className="text-sm font-semibold text-cyan-700">Save</span>
      </button>
    </div>

  )
}
