import {SpotsGrid} from "@/components/spots/SpotsGrid";
import {getSpots} from "@/lib/data/spots";

export default async function  Home() {
  const spotsData = (await getSpots()).spots;
  console.log(spotsData);
  return (
    <div className="container">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Water Sports Spots
        </h1>
        <p className="text-lg text-gray-600">
          Find perfect locations for windsurfing, kitesurfing, and SUP around the world
        </p>
      </div>

      {/* Spots Grid */}
      <SpotsGrid spots={spotsData} />
    </div>  );
}

