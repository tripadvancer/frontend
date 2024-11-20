'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import Lightbox from 'yet-another-react-lightbox'

import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places.api'
import { ImageVariants, UploadingImageStatus } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

import { PlaceFormInputPhotosFileinput } from './place-from-input-photos-fileinput'
import { PlaceFormInputPhotosPreview } from './place-from-input-photos-preview'

const maxPhotosCount = validationConfig.place.photos.maxCount

type UploadingImage = {
    key: string
    uploadedImageUrl: string
    uploadedImageIsCover: boolean
    status: UploadingImageStatus
}

type PlaceFormInputPhotoProps = {
    initialPhotos: {
        url: string
        isCover: boolean
    }[]
    onChange: (value: { url: string; isCover: boolean }[]) => void
}

export const PlaceFormInputPhotos = ({ initialPhotos, onChange }: PlaceFormInputPhotoProps) => {
    const t = useTranslations()
    const toast = useToast()

    const [photos, setPhotos] = useState<UploadingImage[]>([])
    const [upload] = placesAPI.usePlacePhotoUploadMutation()
    const [indexSlide, setIndexSlide] = useState<number>(-1)

    useEffect(() => {
        if (initialPhotos) {
            setPhotos(
                initialPhotos.map(photo => ({
                    key: crypto.randomUUID(),
                    uploadedImageUrl: photo.url,
                    uploadedImageIsCover: photo.isCover,
                    status: UploadingImageStatus.SUCCESS,
                })),
            )
        }
    }, [initialPhotos])

    useEffect(() => {
        const allUploadsFinished = photos.every(({ status }) => status !== UploadingImageStatus.UPLOADING)

        if (allUploadsFinished) {
            const hasCover = photos.some(photo => photo.uploadedImageIsCover)

            if (!hasCover) {
                const firstSuccessfulPhoto = photos.find(({ status }) => status === UploadingImageStatus.SUCCESS)

                if (firstSuccessfulPhoto) {
                    updatePhoto(firstSuccessfulPhoto.key, { uploadedImageIsCover: true })
                }
            }
        }

        onChange(photos.map(photo => ({ url: photo.uploadedImageUrl, isCover: photo.uploadedImageIsCover })))
    }, [photos, onChange])

    const handleFileInputChange = async (files: FileList) => {
        Array.from(files).map(async file => {
            const key = crypto.randomUUID()

            setPhotos(prevPhotos => [
                ...prevPhotos,
                {
                    key,
                    uploadedImageUrl: '',
                    uploadedImageIsCover: false,
                    status: UploadingImageStatus.UPLOADING,
                },
            ])

            try {
                const response = await upload(file).unwrap()
                updatePhoto(key, {
                    uploadedImageUrl: response.url,
                    status: UploadingImageStatus.SUCCESS,
                })
            } catch {
                updatePhoto(key, { status: UploadingImageStatus.ERROR })
                toast.error(t('common.error'))
            }
        })
    }

    const updatePhoto = (key: string, updatedFields: Partial<UploadingImage>) => {
        setPhotos(prev => prev.map(photo => (photo.key === key ? { ...photo, ...updatedFields } : photo)))
    }

    const handleDelete = (key: string) => {
        setPhotos(prevPhotos => prevPhotos.filter(photo => photo.key !== key))
    }

    const handleSetAsCover = (key: string) => {
        setPhotos(prevPhotos =>
            prevPhotos.map(photo => ({
                ...photo,
                uploadedImageIsCover: photo.key === key,
            })),
        )
    }

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="w-full text-black-40 lg:w-64">
                    <div className="lg:hidden">
                        {t('page.placeForm.field.photos.text', { maxCount: maxPhotosCount })}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="h5">{t('page.placeForm.field.photos.label')}</h2>
                        <div className="text-black-40">
                            {photos.length} / {maxPhotosCount}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row-reverse">
                <div className="hidden w-full text-black-40 lg:block lg:w-64">
                    {t('page.placeForm.field.photos.text', { maxCount: maxPhotosCount })}
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                        <PlaceFormInputPhotosFileinput photosLength={photos.length} onChange={handleFileInputChange} />

                        {photos.map((photo, index) => (
                            <PlaceFormInputPhotosPreview
                                key={`place-form-input-photo-${photo.key}`}
                                url={photo.uploadedImageUrl}
                                isCover={photo.uploadedImageIsCover}
                                status={photo.status}
                                onClick={() => setIndexSlide(index)}
                                onDelete={() => handleDelete(photo.key)}
                                onSetAsCover={() => handleSetAsCover(photo.key)}
                                onRetry={() => {}}
                            />
                        ))}

                        <Lightbox
                            open={indexSlide >= 0}
                            close={() => setIndexSlide(-1)}
                            index={indexSlide}
                            slides={photos.map(photo => ({
                                src: makeImageUrl(photo.uploadedImageUrl, ImageVariants.PUBLIC),
                            }))}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
