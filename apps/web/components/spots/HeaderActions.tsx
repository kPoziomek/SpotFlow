export  function HeaderActions (){
  return(
    <div className="flex items-center space-x-4">
      <button className="flex items-center space-x-2 px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200">
        <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span className="text-sm font-semibold text-cyan-700">Share</span>
      </button>

      <button className="flex items-center space-x-2 px-4 py-2 border border-cyan-200 rounded-lg hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200">
        <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-sm font-semibold text-cyan-700">Save</span>
      </button>
    </div>

  )
}
