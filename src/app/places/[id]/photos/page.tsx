import type { Metadata } from 'next/types'

import { getCountryNameByCode } from '@/utils/countries'
import { IPhoto } from '@/utils/interfaces'

import { getPlaceById } from '@/services/places'

import { PhotoFeed } from '@/components/PhotoFeed'

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const place = await getPlaceById(params.id)
    const countryName = getCountryNameByCode(place.countryCode)

    return {
        title: `${place.title}${countryName ? `, ${countryName}` : ''} | Tripadvancer`,
        description: '',
    }
}

export default async function Photo({ params }: { params: { id: string } }) {
    const place = await getPlaceById(params.id)
    const photosWithCover: IPhoto[] = place.photos.slice()

    if (place.cover) {
        photosWithCover.unshift({
            id: 0,
            url: place.cover,
        })
    }

    return (
        <div className="grid grid-cols-4 gap-2 phone:grid-cols-2">
            <PhotoFeed photos={photosWithCover} title={place.title} size={186} />
        </div>
    )
}
