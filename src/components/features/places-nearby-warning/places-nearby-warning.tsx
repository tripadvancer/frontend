import Link from 'next/link'

import { IPlaceNearby } from '@/utils/types/place'

import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PlacesNearbyWarning = ({ places }: { places: IPlaceNearby[] }) => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-4 sm:w-104">
            <h1 className="h7">{t('places_nearby_warning.title')}</h1>
            <hr className="border-black-70" />
            <p>
                {t('places_nearby_warning.message', {
                    radius: process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS,
                })}
            </p>
            <ul className="list-inside list-disc">
                {places.map(place => (
                    <li key={`place-nearby-${place.id}`}>
                        <Link href={`/places/${place.id}`} className="link-black" target="_blank">
                            {place.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
