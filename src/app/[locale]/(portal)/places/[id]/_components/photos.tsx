'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import Image from 'next/image'

import type { IPhoto } from '@/utils/types/photo'
import type { IPlace } from '@/utils/types/place'

import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

type PhotosProps = IPlace

export const Photos = ({ title, author, photos, cover }: PhotosProps) => {
    const t = useI18n()
    const photosWithCover: IPhoto[] = cover ? [{ id: 0, url: cover }, ...photos] : photos

    const [indexSlide, setIndexSlide] = useState<number>(-1)

    if (photos.length === 0) {
        return null
    }

    return (
        <section className="mb-16">
            <h2 className="mb-8 text-h5-m sm:text-h5">{t('pages.place.photos.title')}</h2>
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
                        description: author.name,
                        src: makeImageUrl(photo.url, ImageVariant.PUBLIC),
                    }))}
                />
            </div>
        </section>
    )
}
