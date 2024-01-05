'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'

import { PhotoPreview } from '@/components/photo-preview'
import { useToast } from '@/providers/toast-provider'
import { reviewPhotoUpload } from '@/services/reviews'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewPhotoInput } from './review-photo-input'

type ReviewPhotosListProps = {
    photos: string[]
    onChange: (urls: string[]) => void
}

export const ReviewPhotosList = ({ photos, onChange }: ReviewPhotosListProps) => {
    const t = useI18n()
    const toast = useToast()

    const [indexSlide, setIndexSlide] = useState<number>(-1)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const handlePhotoUpload = async (files: FileList) => {
        const uploadPromises = Array.from(files).map(async file => {
            try {
                setIsUploading(true)
                const res = await reviewPhotoUpload(file as File)
                return res.url
            } catch {
                toast.error(t('common.error'))
            } finally {
                setIsUploading(false)
            }
        })

        try {
            const urls = await Promise.all(uploadPromises)
            const filteredUrls = urls.filter(url => url !== undefined) as string[]
            onChange([...photos, ...filteredUrls])
        } catch (error) {
            toast.error(t('common.error'))
        }
    }

    const handlePhotoDelete = (url: string) => {
        onChange(photos.filter(photo => photo !== url))
    }

    return (
        <div className="flex flex-col gap-y-2">
            <ReviewPhotoInput
                currentPhotosCount={photos.length}
                isUploading={isUploading}
                onChange={handlePhotoUpload}
            />

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {photos.map((photo, index) => (
                    <PhotoPreview
                        key={photo}
                        url={photo}
                        alt=""
                        size={64}
                        onPhotoClick={() => setIndexSlide(index)}
                        onPhotoDelete={() => handlePhotoDelete(photo)}
                    />
                ))}

                <Lightbox
                    open={indexSlide >= 0}
                    close={() => setIndexSlide(-1)}
                    index={indexSlide}
                    slides={photos.map(photo => ({
                        src: makeImageUrl(photo, ImageVariant.PUBLIC),
                    }))}
                />
            </div>
        </div>
    )
}
