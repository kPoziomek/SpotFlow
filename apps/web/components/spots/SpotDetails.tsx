import {Spot} from "@/types/types";


export default function SpotDetails ({spot}:{spot:Spot}){

  return (
    <div>
      <h1>Details</h1>
      <p>{spot.name}</p>
    </div>
  )
}
