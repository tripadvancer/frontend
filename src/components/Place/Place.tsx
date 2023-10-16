import Image from 'next/image'
import Link from 'next/link'

import { IPlacePreview } from '@/types/place'

import { ImageNotFound } from '@/components/ImageNotFound'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type PlaceType = IPlacePreview

export const Place = ({ id, title, cover }: PlaceType) => {
    return (
        <Link href={`/places/${id}`}>
            <div className="mb-2">
                {cover ? (
                    <Image
                        src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                        alt={title}
                        width={192}
                        height={192}
                        className="mb-2 rounded-lg phone:w-full"
                    />
                ) : (
                    <ImageNotFound className="max-w-[192px] rounded-lg phone:max-w-full" />
                )}
            </div>
            <span className="text-sm font-medium">{title}</span>
        </Link>
    )
}
