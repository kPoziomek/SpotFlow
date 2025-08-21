from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

from spotflow_api.services.spots import SpotsService

router = APIRouter(prefix='/spots', tags=["spots"])
spots_service = SpotsService()

@router.get("/")
async def get_spots(
    country: Optional[str] = Query(None, description="Filter by country"),
    sport: Optional[str] = Query(None, description="Filter by sport"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty level")
):
    try:
        spots = spots_service.get_all_spots(country=country, sport=sport, difficulty=difficulty)
        return {
            "spots": spots,
            "count": len(spots),
            "filters": {
                "country": country,
                "sport": sport,
                "difficulty": difficulty
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching spots: {str(e)}")


@router.get("/{spot_id}")
async def get_spot(spot_id: str):
    try:
        spot = spots_service.get_spot_by_id(spot_id)

        if not spot:
            raise HTTPException(status_code=404, detail="Spot not found")
        return spot
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching spot: {str(e)}")

@router.get("/stats/count")
async def get_spots_count():
    try:
        count = spots_service.count_spots()
        return {"Total Spots": count}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching spots count: {str(e)}")

@router.post("/")
async def create_spot(spot_data: dict):
    try:
        if not spot_data:
            raise HTTPException(status_code=400, detail="Spot data is required")

        new_spot = spots_service.create_spot(spot_data)
        return {"message": "Spot created successfully", "spot": new_spot}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating spot: {str(e)}")