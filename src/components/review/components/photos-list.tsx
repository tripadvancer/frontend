'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import type { IPhoto } from '@/utils/types/photo'

import { Photo } from '@/components/photo'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'

type PhotosListProps = {
    title: string
    description: string
    photos: IPhoto[]
}

export const PhotosList = ({ title, description, photos }: PhotosListProps) => {
    const [indexSlide, setIndexSlide] = useState<number>(-1)

    if (photos.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
            {photos.map((photo, index) => (
                <Photo key={photo.id} url={photo.url} size={64} alt={title} onClick={() => setIndexSlide(index)} />
            ))}

            <Lightbox
                plugins={[Zoom, Captions]}
                open={indexSlide >= 0}
                close={() => setIndexSlide(-1)}
                index={indexSlide}
                slides={photos.map(photo => ({
                    title,
                    description,
                    src: makeImageUrl(photo.url, ImageVariant.PUBLIC),
                }))}
            />
        </div>
    )
}
