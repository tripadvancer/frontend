import { Suspense } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { IPlace } from '@/utils/types/place'

import { ImageNotFound } from '@/components/ui/image-not-found'
import { getPlacesNearby } from '@/services/places'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { getI18n } from '@/utils/i18n/i18n.server'

import { PlaceSidebarNearbySkeleton } from './place-sidebar-nearby-skeleton'

export const PlaceSidebarNearby = async ({ id }: IPlace) => {
    const t = await getI18n()
    const placesNearby = await getPlacesNearby(id.toString())

    if (placesNearby.length === 0) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('pages.place.place_nearby.title')}</h3>
            <Suspense fallback={<PlaceSidebarNearbySkeleton />}>
                <div className="flex flex-col gap-4">
                    {placesNearby.map(placeNearby => (
                        <Link
                            key={`place-nearby-${placeNearby.id}`}
                            href={`/places/${placeNearby.id}`}
                            className="flex-none text-black-100"
                        >
                            <div className="flex flex-row gap-4">
                                {placeNearby.cover ? (
                                    <Image
                                        src={makeImageUrl(placeNearby.cover, ImageVariant.PREVIEW)}
                                        className="rounded-lg"
                                        width={80}
                                        height={80}
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                                        alt={placeNearby.title}
                                    />
                                ) : (
                                    <ImageNotFound className="w-20 rounded-lg" />
                                )}
                                <div className="flex flex-col justify-between">
                                    <div className="line-clamp-2 font-medium">{placeNearby.title}</div>
                                    <div className="text-small text-black-40">
                                        {t('common.distance.km', {
                                            distance: Math.round(placeNearby.distance / 100) / 10,
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Suspense>
        </section>
    )
}
