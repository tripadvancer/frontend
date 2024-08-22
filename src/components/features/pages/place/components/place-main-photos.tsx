import { getTranslations } from 'next-intl/server'

import type { IPlace } from '@/utils/types/place'

import { PhotoGallery } from '@/components/ui/photo-gallery'

export const PlaceMainPhotos = async ({ title, author, photos, cover }: IPlace) => {
    const t = await getTranslations()
    const photosWithCover = cover ? [{ id: 0, url: cover }, ...photos] : photos

    if (photosWithCover.length === 0) {
        return null
    }

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">{t('page.place.photos')}</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                <PhotoGallery photos={photosWithCover} title={title} description={author.name} size={186} />
            </div>
        </section>
    )
}
