'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'

import { PhotoPreview } from '@/components/ui/photo-preview'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlaceFormInputPhoto } from './place-form-input-photo'

const maxPhotosCount = validationConfig.place.photos.maxCount

type PlaceFormPhotosListProps = {
    photos: string[]
    onChange: (urls: string[]) => void
}

export const PlaceFormPhotosList = ({ photos, onChange }: PlaceFormPhotosListProps) => {
    const t = useI18n()
    const toast = useToast()

    const [upload] = placesAPI.usePlacePhotoUploadMutation()
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
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="w-full text-black-40 lg:w-64">
                    <div className="lg:hidden">{t('pages.add_place.photos.info', { max_count: maxPhotosCount })}</div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="h5">{t('pages.add_place.photos.title')}</h2>
                        <div className="text-black-40">
                            {photos.length} / {maxPhotosCount}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="hidden w-full text-black-40 lg:block lg:w-64">
                    {t('pages.add_place.photos.info', { max_count: maxPhotosCount })}
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                        <PlaceFormInputPhoto
                            currentPhotosCount={photos.length}
                            maxPhotosCount={maxPhotosCount}
                            isUploading={isUploading}
                            onChange={handlePhotoUpload}
                        />

                        {photos.map((photo, index) => (
                            <PhotoPreview
                                key={photo}
                                url={photo}
                                size={186}
                                alt=""
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
            </div>
        </div>
    )
}
