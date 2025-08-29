
interface Props {
  spotName: string
  spotImages: number[] | undefined
}

export default function SpotImages({spotName,spotImages}: Props) {

 return  (
   <>
     {spotImages?.map((i) =>(
       <div key={i} className="relative">
         <div className="w-full h-full bg-gray-100 relative text-stone-900">
           <img
             src={`/api/placeholder/300/200?sig=${i}`}
             alt={`${spotName} view ${i}`}
             className="w-full h-full object-cover"
           />
           {i === 4 && (
             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
               <button className="text-white font-semibold flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                         d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                 </svg>
                 Show all photos
               </button>
             </div>
           )}
         </div>
       </div>))}
   </>
 )


}
