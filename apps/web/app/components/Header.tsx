import UserMenu from "./UserMenu";
import SearchInputs from "./SearchInputs";
import Link from "next/link";



export default function Header (){
return(
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="flex-shrink-0">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            <Link href="/">SpotFlow</Link>
            </div>
        </div>
        <div className="py-4 flex-1">
          <form action="/spots" method="GET">
            <SearchInputs />
          </form>
        </div>
        <UserMenu />
      </div>
    </div>
  </header>
)
}



  function HeaderOK (){
  return(
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SpotFlow</div>
          </div>
          {/*<Navigation />*/}
          <UserMenu />
        </div>

        {/* Airbnb-style search bar */}
        <div className="pb-4">
          <form action="/spots" method="GET">
            <SearchInputs />
          </form>
        </div>
      </div>
    </header>
  )
}
