import Link from 'next/link'

import { PlacePreviewMeta } from '@/components/ui/place-preview-meta'
import { Rating } from '@/components/ui/rating'
import { IReview } from '@/utils/types/common'

export const ReviewRatingPlace = ({ place, rating, createdAt }: IReview) => {
    return (
        <div className="flex flex-col gap-y-1 overflow-hidden">
            <Rating value={rating} size={16} />
            <div className="flex flex-col flex-wrap gap-x-2 sm:flex-row">
                <Link href={`/places/${place.id}`} className="break-words text-small-bold text-black-70">
                    {place.title}
                </Link>
                <PlacePreviewMeta countryCode={place.countryCode} createdAt={createdAt} />
            </div>
        </div>
    )
}
