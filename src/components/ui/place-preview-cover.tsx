import Image from 'next/image'

import { IPlacePreview } from '@/utils/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

import { CameraIcon48 } from './icons'

export const PlacePreviewCover = (place: IPlacePreview) => {
    if (place.cover) {
        return (
            <Image
                src={makeImageUrl(place.cover, ImageVariant.PREVIEW)}
                width="80"
                height="80"
                className="rounded-lg"
                alt={place.title}
            />
        )
    }

    return (
        <div className="flex h-20 w-20 flex-none items-center justify-center rounded-lg bg-black-5 text-white">
            <CameraIcon48 />
        </div>
    )
}
