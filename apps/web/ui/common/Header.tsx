import UserMenu from "../auth/UserMenu";
import SearchInputs from "./SearchInputs";
import Link from "next/link";

export default function Header (){
return(
  <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div className="hidden flex-shrink-0 md:flex-initial flex-1">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-center md:text-left">
            <Link href="/">SpotFlow</Link>
          </div>
        </div>
        <div className="py-4 flex-1">
          <form action="/spots" method="GET">
            <SearchInputs />
          </form>
        </div>
        <div className="hidden md:block">
          <UserMenu />
        </div>
      </div>
    </div>
  </header>
)}
