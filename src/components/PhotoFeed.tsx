'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import Image from 'next/image'

import { IPhoto } from '@/utils/interfaces'

import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

type PhotoFeedProps = {
    title: string
    photos: IPhoto[]
    size: number
}

export const PhotoFeed = ({ title, photos, size }: PhotoFeedProps) => {
    const [indexSlide, setIndexSlide] = useState<number>(-1)

    return (
        <>
            {photos.map((photo, index) => (
                <Image
                    key={photo.id}
                    src={photo.url + '/preview'}
                    className="w-full cursor-pointer rounded-lg"
                    width={size}
                    height={size}
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
                slides={photos.map(photo => ({ title, src: photo.url + '/public' }))}
            />
        </>
    )
}
