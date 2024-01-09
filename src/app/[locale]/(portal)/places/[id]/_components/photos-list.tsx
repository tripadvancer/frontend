'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import type { IPhoto } from '@/utils/types/photo'
import type { IPlace } from '@/utils/types/place'

import { Photo } from '@/components/ui/photo'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

export const PhotosList = ({ title, author, photos, cover }: IPlace) => {
    const t = useI18n()
    const photosWithCover: IPhoto[] = cover ? [{ id: 0, url: cover }, ...photos] : photos

    const [indexSlide, setIndexSlide] = useState<number>(-1)

    if (photos.length === 0) {
        return null
    }

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="text-h5-m sm:text-h5">{t('pages.place.photos.title')}</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {photosWithCover.map((photo, index) => (
                    <Photo key={photo.id} url={photo.url} size={186} alt={title} onClick={() => setIndexSlide(index)} />
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
