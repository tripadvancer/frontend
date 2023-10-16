import Image from 'next/image'
import Link from 'next/link'

import { IPlacePreview } from '@/types/place'

import { ImageNotFound } from '@/components/ImageNotFound'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type UserPlaceType = IPlacePreview

export const UserPlace = ({ id, title, cover }: UserPlaceType) => {
    return (
        <Link href={`/places/${id}`}>
            <div className="mb-2">
                {cover ? (
                    <Image
                        src={makeImageUrl(cover, ImageVariant.PREVIEW)}
                        alt={title}
                        width={192}
                        height={192}
                        className="mb-2 w-full rounded-lg"
                    />
                ) : (
                    <ImageNotFound className="max-w-full rounded-lg" />
                )}
            </div>
            <span className="text-sm font-medium">{title}</span>
        </Link>
    )
}
