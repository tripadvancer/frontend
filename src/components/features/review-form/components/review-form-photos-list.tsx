'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'

import { PhotoPreview } from '@/components/ui/photo-preview'
import { useToast } from '@/providers/toast-provider'
import { reviewsAPI } from '@/redux/services/reviews-api'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ReviewFormInputPhoto } from './revew-form-input-photo'

type ReviewFormPhotosListProps = {
    photos: string[]
    onChange: (urls: string[]) => void
}

export const ReviewFormPhotosList = ({ photos, onChange }: ReviewFormPhotosListProps) => {
    const t = useI18n()
    const toast = useToast()

    const [upload] = reviewsAPI.useReviewPhotoUploadMutation()
    const [indexSlide, setIndexSlide] = useState<number>(-1)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const handlePhotoUpload = async (files: FileList) => {
        const uploadPromises = Array.from(files).map(async file => {
            const formData = new FormData()
            formData.append('file', file)

            try {
                setIsUploading(true)
                const response = await upload(formData).unwrap()
                return response.url
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
            <ReviewFormInputPhoto
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
