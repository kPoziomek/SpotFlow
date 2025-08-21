from typing import List, Dict, Optional
from supabase import Client

from spotflow_api.core.database import get_supabase


class SpotsService:
    def __init__(self):
        self.supabase: Client = get_supabase()
        self.table_name = "spots"

    def get_all_spots(
            self,
            country: Optional[str] = None,
            sport: Optional[str] = None,
            difficulty: Optional[str] = None
    ) -> List[Dict]:
        """Get all spots with optional filtering"""
        try:
            query = self.supabase.table(self.table_name).select("*")

            if country:
                query = query.ilike("country", f"%{country}%")
            if sport:
                query = query.contains("sports", [sport])
            if difficulty:
                query = query.eq("difficulty", difficulty)

            response = query.execute()
            return response.data

        except Exception as e:
            print(f"Error fetching spots: {e}")
            raise e

    def get_spot_by_id(self, spot_id: str) -> Optional[Dict]:
        """Get single spot by ID"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .select("*")
                .eq("id", spot_id)
                .single()
                .execute()
            )
            return response.data
        except Exception as e:
            print(f"Error fetching spot {spot_id}: {e}")
            return None

    def create_spot(self, spot_data: Dict) -> Dict:
        """Create new spot"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .insert(spot_data)
                .execute()
            )
            return response.data[0]
        except Exception as e:
            print(f"Error creating spot: {e}")
            raise e

    def count_spots(self) -> int:
        """Get total count of spots"""
        try:
            response = (
                self.supabase.table(self.table_name)
                .select("id", count="exact")
                .execute()
            )
            return response.count
        except Exception as e:
            print(f"Error counting spots: {e}")
            return 0