import type { IPhoto } from '@/utils/types/photo'

import { PhotoGallery } from '@/components/ui/photo-gallery'

type ReviewPhotosListProps = {
    title: string
    description: string
    photos: IPhoto[]
}

export const ReviewPhotosList = ({ title, description, photos }: ReviewPhotosListProps) => {
    if (photos.length === 0) {
        return null
    }

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-9">
            <PhotoGallery photos={photos} title={title} description={description} size={64} />
        </div>
    )
}
