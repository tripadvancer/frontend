'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import Image from 'next/image'

import type { IPhoto } from '@/utils/types/photo'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

type PhotosProps = {
    title: string
    description: string
    photos: IPhoto[]
    cover: string | null
}

export const Photos = ({ title, description, photos, cover }: PhotosProps) => {
    const [indexSlide, setIndexSlide] = useState<number>(-1)

    const photosWithCover: IPhoto[] = cover ? [{ id: 0, url: cover }, ...photos] : photos

    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {photosWithCover.map((photo, index) => (
                <Image
                    key={photo.id}
                    src={makeImageUrl(photo.url, ImageVariant.PREVIEW)}
                    className="w-full cursor-pointer rounded-lg"
                    width={186}
                    height={186}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8eftuPQAIOAMS40NHBQAAAABJRU5ErkJggg=="
                    alt={title}
                    onClick={() => setIndexSlide(index)}
                />
            ))}

            <Lightbox
                plugins={[Zoom, Captions]}
                open={indexSlide >= 0}
                close={() => setIndexSlide(-1)}
                index={indexSlide}
                slides={photosWithCover.map(photo => ({
                    title,
                    description,
                    src: makeImageUrl(photo.url, ImageVariant.PUBLIC),
                }))}
            />
        </div>
    )
}
