import {Spot} from "@/types/types";
import {getSpotImageUrl} from "@/lib/image_url";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/ui/FavoriteButton";
import SpotSportTagList from "@/ui/spots/SpotSportTagList";
import SpotDifficultyTag from "@/ui/spots/SpotDifficultyTag";
import SpotLocationAndRating from "@/ui/spots/SpotLocationAndRating";

export function SpotCard({ spot }: { spot: Spot }) {


  const primaryImage = getSpotImageUrl(spot.image_url!)

  return (
    <Link href={`/spots/${spot.id}`} target="_blank" className="group block">
      <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-100 border border-gray-100 hover:border-cyan-200">
        <div className="aspect-square relative">
          <Image
            loading="lazy"
            placeholder="blur"
            blurDataURL={primaryImage}
            priority={false}
            src={primaryImage}
            alt={spot.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={85}
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          {/* Favorite button with auth check */}
          <FavoriteButton
            isFavorite={spot.isFavorite}
            spotId={spot.id}
          />
        </div>
        {/* Content */}
        <div className="p-4">
          <SpotLocationAndRating spot={spot} />
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {spot.name}
          </h3>
          <SpotSportTagList spot={spot} />
          <SpotDifficultyTag spot={spot}/>
        </div>
      </div>
    </Link>
  )
}
