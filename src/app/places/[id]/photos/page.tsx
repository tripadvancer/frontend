import type { Metadata } from 'next/types'
import { getPlaceById } from '@/services/places'
import { PhotoFeed } from '@/components/PhotoFeed'

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

    return (
        <div className="phone:grid-cols-2 grid grid-cols-4 gap-2">
            <PhotoFeed photos={place.photos} title={place.title} />
        </div>
    )
}
