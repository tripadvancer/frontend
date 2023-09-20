'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import Image from 'next/image'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'

type Photo = {
    url: string
}

type PhotoFeedProps = {
    title: string
    photos: Photo[]
}

export const PhotoFeed = ({ title, photos }: PhotoFeedProps) => {
    const [indexSlide, setIndexSlide] = useState<number>(-1)

    return (
        <>
            {photos.map((photo, index) => (
                <Image
                    key={photo.url}
                    src={photo.url + '/preview'}
                    className="cursor-pointer rounded-lg w-full"
                    width={154}
                    height={154}
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
