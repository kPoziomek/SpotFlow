"""
Test Supabase connection and data fetch
"""
import sys
import os

from src.spotflow_api.core.database import test_connection
from src.spotflow_api.services.spots import SpotsService

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))




def test_spots_service():
    # Test connection
    print("Testing Supabase connection...")
    if not test_connection():
        return

    # Test spots service
    print("\nTesting Spots service...")
    spots_service = SpotsService()

    try:
        # Get all spots
        spots = spots_service.get_all_spots()
        print(f"✅ Found {len(spots)} spots:")

        for spot in spots[:3]:  # Show first 3
            print(f"  - {spot.get('name', 'N/A')} ({spot.get('country', 'N/A')})")

        # Test filtering
        print(f"\nTesting filters...")
        poland_spots = spots_service.get_all_spots(country="Poland")
        print(f"Poland spots: {len(poland_spots)}")

        # Test count
        total = spots_service.count_spots()
        print(f"Total spots in database: {total}")

    except Exception as e:
        print(f"❌ Error testing spots service: {e}")


if __name__ == "__main__":
    test_spots_service()