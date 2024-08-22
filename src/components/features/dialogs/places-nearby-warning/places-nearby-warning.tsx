import { useTranslations } from 'next-intl'

import Link from 'next/link'

import type { IPlaceNearby } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'
import { PlacePreviewRating } from '@/components/ui/place-preview-rating'
import { useDialog } from '@/providers/dialog-provider'

export const PlacesNearbyWarning = ({ places }: { places: IPlaceNearby[] }) => {
    const t = useTranslations()
    const dialog = useDialog()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('dialog.placesNearbyWarning.title')}</h1>
            <p className="text-center">
                {t('dialog.placesNearbyWarning.text', {
                    radius: process.env.NEXT_PUBLIC_UNIQUE_PLACE_RADIUS,
                })}
            </p>

            <div className="flex flex-col gap-y-4">
                {places.map(place => (
                    <div key={`place-nearby-${place.id}`} className="flex gap-x-4">
                        <Link href={`places/${place.id}`} className="peer flex-none" target="_blank">
                            <PlacePreviewCover
                                cover={place.cover}
                                title={place.title}
                                size={80}
                                className="aspect-square w-20 rounded-lg"
                            />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between overflow-hidden text-black-100 peer-hover:text-blue-active">
                            <Link
                                href={`places/${place.id}`}
                                className="line-clamp-2 break-words font-medium text-inherit"
                                target="_blank"
                            >
                                {place.title}
                            </Link>
                            <PlacePreviewRating {...place} />
                        </div>
                    </div>
                ))}
            </div>

            <FormButton type="stroke" onClick={() => dialog.close()}>
                {t('common.action.ok')}
            </FormButton>
        </div>
    )
}
