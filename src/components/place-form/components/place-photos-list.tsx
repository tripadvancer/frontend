'use client'

import { useState } from 'react'

import Lightbox from 'yet-another-react-lightbox'

import { PhotoPreview } from '@/components/photo-preview'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { placePhotoUpload } from '@/services/places'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

import { PlacePhotoInput } from './place-photo-input'

const maxPhotosCount = validationConfig.place.photos.maxCount

type PlacePhotosListProps = {
    photos: string[]
    onChange: (urls: string[]) => void
}

export const PlacePhotosList = ({ photos, onChange }: PlacePhotosListProps) => {
    const t = useI18n()
    const toast = useToast()

    const [indexSlide, setIndexSlide] = useState<number>(-1)
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const handlePhotoUpload = async (files: FileList) => {
        const uploadPromises = Array.from(files).map(async file => {
            try {
                setIsUploading(true)
                const res = await placePhotoUpload(file as File)
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
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col lg:flex-row lg:gap-x-8">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="text-h5-m sm:text-h5">{t('pages.add_place.photos.title')}</h2>
                        <div className="text-black-40">
                            {photos.length} / {maxPhotosCount}
                        </div>
                    </div>
                </div>
                <div className="hidden w-64 lg:block" />
            </div>

            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="w-full text-black-40 lg:w-64">
                    {t('pages.add_place.photos.info', { max_count: maxPhotosCount })}
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                        <PlacePhotoInput
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
