'use client'

import { useState } from 'react'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Lightbox from 'yet-another-react-lightbox'

import { useToast } from '@/components/providers/toast-provider'
import { FormFileInput } from '@/components/ui/form-file-input'
import { PhotoPreview } from '@/components/ui/photo-preview'
import { validationConfig } from '@/configs/validation.config'
import { ImageVariants } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'
import { reviewsAPI } from '@/utils/redux/services/reviews/reviews.api'

const maxFilesCount = validationConfig.review.photos.maxCount
const maxFileSize = validationConfig.common.maxFileSize

type ReviewFormPhotosListProps = {
    photos: string[]
    isDisabled?: boolean
    setIsFormDisabled: (isUploading: boolean) => void
    onChange: (urls: string[]) => void
}

export const ReviewFormPhotosList = ({
    photos,
    isDisabled,
    setIsFormDisabled,
    onChange,
}: ReviewFormPhotosListProps) => {
    const t = useTranslations()
    const toast = useToast()

    const [upload] = reviewsAPI.useReviewPhotoUploadMutation()
    const [indexSlide, setIndexSlide] = useState<number>(-1)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const handlePhotoUpload = async (files: FileList) => {
        setIsUploading(true)
        setIsFormDisabled(true)

        const uploadPromises = Array.from(files).map(async file => {
            const formData = new FormData()
            formData.append('file', file)

            try {
                const response = await upload(formData).unwrap()
                return response.url
            } catch {
                toast.error(t('common.error'))
            }
        })

        try {
            const urls = await Promise.all(uploadPromises)
            const filteredUrls = urls.filter(url => url !== undefined) as string[]
            onChange([...photos, ...filteredUrls])
        } catch (error) {
            toast.error(t('common.error'))
        } finally {
            setIsUploading(false)
            setIsFormDisabled(false)
        }
    }

    const handlePhotoDelete = (url: string) => {
        onChange(photos.filter(photo => photo !== url))
    }

    return (
        <div
            className={classNames('flex flex-col gap-y-2', {
                'pointer-events-none opacity-30': isDisabled,
            })}
        >
            <FormFileInput
                multiple
                maxFilesCount={maxFilesCount}
                maxFileSize={maxFileSize}
                currentFilesLength={photos.length}
                isUploading={isUploading}
                onChange={handlePhotoUpload}
            />

            {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {photos.map((photo, index) => (
                        <PhotoPreview
                            key={`review-photo-${photo}`}
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
                            src: makeImageUrl(photo, ImageVariants.PUBLIC),
                        }))}
                    />
                </div>
            )}
        </div>
    )
}
