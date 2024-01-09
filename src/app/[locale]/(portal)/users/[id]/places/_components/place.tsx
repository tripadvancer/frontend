import Image from 'next/image'
import Link from 'next/link'

import type { IPlacePreview } from '@/utils/types/place'

import { ImageNotFound } from '@/components/ui/image-not-found'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

export const Place = ({ id, title, cover }: IPlacePreview) => {
    return (
        <Link href={`/places/${id}`} className="text-black-100">
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
            <div className="font-medium">{title}</div>
        </Link>
    )
}
