import type { IPlace } from '@/utils/types/place'

import { PhotoGallery } from '@/components/ui/photo-gallery'
import { getI18n } from '@/utils/i18n/i18n.server'

export const PlaceMainPhotos = async ({ title, author, photos, cover }: IPlace) => {
    const t = await getI18n()

    if (photos.length === 0) {
        return null
    }

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="text-h5-m sm:text-h5">{t('pages.place.photos.title')}</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                <PhotoGallery
                    photos={cover ? [{ id: 0, url: cover }, ...photos] : photos}
                    title={title}
                    description={author.name}
                    size={186}
                />
            </div>
        </section>
    )
}
