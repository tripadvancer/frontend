'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import Image from 'next/image'

import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

type FeedItemPhotosProps = {
    photos: {
        id: number
        url: string
    }[]
    title: string
    author: string
}

export const FeedItemPhotos = ({ photos, title, author }: FeedItemPhotosProps) => {
    const [indexSlide, setIndexSlide] = useState(-1)

    const renderPhoto = (photoIndex: number, className: string, showRemainingCount = false) => {
        const photo = photos[photoIndex]
        const remainingPhotosCount = photos.length - 3

        return (
            <button
                key={`feed-item-photo-${photo.id}`}
                type="button"
                className={`relative overflow-hidden rounded-2xl ${className}`}
                aria-label={`View photo ${photoIndex + 1} of ${photos.length}`}
                onClick={() => setIndexSlide(photoIndex)}
            >
                <Image
                    src={makeImageUrl(photo.url, ImageVariants.PREVIEW)}
                    width={1280}
                    height={960}
                    alt={`${title} by ${author}`}
                    className="h-full w-full object-cover"
                />
                {showRemainingCount && remainingPhotosCount > 0 && (
                    <span className="bg-black-60 flex-center absolute inset-0 text-big-bold text-white">
                        +{remainingPhotosCount}
                    </span>
                )}
            </button>
        )
    }

    return (
        <>
            {photos.length === 1 ? (
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">{renderPhoto(0, 'h-full w-full')}</div>
            ) : (
                <div className="grid aspect-[3/2] grid-cols-[2fr_1fr] grid-rows-2 gap-2">
                    {renderPhoto(0, 'row-span-2 h-full w-full')}
                    {renderPhoto(1, `${photos.length === 2 ? 'row-span-2' : ''} h-full w-full`)}
                    {photos.length > 2 && renderPhoto(2, 'h-full w-full', true)}
                </div>
            )}

            <Lightbox
                plugins={[Zoom, Captions]}
                open={indexSlide >= 0}
                close={() => setIndexSlide(-1)}
                index={indexSlide}
                slides={photos.map(photo => ({
                    title,
                    description: author,
                    src: makeImageUrl(photo.url, ImageVariants.PUBLIC),
                }))}
            />
        </>
    )
}
