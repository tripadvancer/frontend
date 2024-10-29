'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { Photo } from '@/components/ui/photo'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type PhotoGalleryProps = {
    photos: {
        id: number
        url: string
    }[]
    title: string
    description: string
    size: number
}

export const PhotoGallery = ({ photos, title, description, size }: PhotoGalleryProps) => {
    const [indexSlide, setIndexSlide] = useState<number>(-1)

    return (
        <>
            {photos.map((photo, index) => (
                <Photo
                    key={`photo-${index}`}
                    url={photo.url}
                    size={size}
                    alt={title}
                    onClick={() => setIndexSlide(index)}
                />
            ))}

            <Lightbox
                plugins={[Zoom, Captions]}
                open={indexSlide >= 0}
                close={() => setIndexSlide(-1)}
                index={indexSlide}
                slides={photos.map(photo => ({
                    title,
                    description,
                    src: makeImageUrl(photo.url, ImageVariants.PUBLIC),
                }))}
            />
        </>
    )
}
