import Image from 'next/image'

import type { IPlace } from '@/utils/types/place'

import { getI18n } from '@/utils/i18n/i18n.server'

export const PlaceMainMap = async ({ title, location }: IPlace) => {
    const t = await getI18n()
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    const lng = location.coordinates[0]
    const lat = location.coordinates[1]

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="text-h5-m sm:text-h5">{t('pages.place.map.title', { place_name: title })}</h2>
            <Image
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s+ff7d00(${lng},${lat})/${lng},${lat},12,0.00/640x320@2x?access_token=${mapboxAccessToken}`}
                width={640}
                height={320}
                className="w-full rounded-2xl"
                alt={t('pages.place.map.alt', { place_name: title })}
            />
        </section>
    )
}
