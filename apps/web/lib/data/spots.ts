import {spotFlowAPI} from "../api";
import {SpotFilters} from "@/types/types";


export async function getSpots(filters?:SpotFilters) {
  return spotFlowAPI.getSpots(filters)
}
