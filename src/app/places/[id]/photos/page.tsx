import type { Metadata } from 'next/types'
import { getPlaceById } from '@/services/get-place'
import { Photo, PhotoFeed } from '@/components/PhotoFeed'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)

    return {
        title: `${place.title}, ${place.countryCode} | Photos | Tripadvancer`,
        description: place.description,
    }
}

export default async function Photo({ params }: { params: { id: string } }) {
    const place = await getPlaceById(params.id)
    const photosWithCover: Photo[] = place.photos.slice()

    if (place.cover) {
        photosWithCover.unshift({ url: place.cover })
    }

    return (
        <div className="phone:grid-cols-2 grid grid-cols-4 gap-2">
            <PhotoFeed photos={photosWithCover} title={place.title} />
        </div>
    )
}
