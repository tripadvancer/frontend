'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import Lightbox from 'yet-another-react-lightbox'

import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places/places.api'
import { ImageVariants, UploadingImageStatus } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers/common'

import { PlaceFormInputPhotosFileinput } from './place-from-input-photos-fileinput'
import { PlaceFormInputPhotosPreview } from './place-from-input-photos-preview'

const maxPhotosCount = validationConfig.place.photos.maxCount

type UploadingImage = {
    key: string
    file: File | null
    uploadedPhotoUrl: string
    uploadedPhotoIsCover: boolean
    status: UploadingImageStatus
}

type PlaceFormInputPhotoProps = {
    initialPhotos: {
        url: string
        isCover: boolean
    }[]
    setIsFormDisabled: (isUploading: boolean) => void
    onChange: (value: { url: string; isCover: boolean }[]) => void
}

export const PlaceFormInputPhotos = ({ initialPhotos, setIsFormDisabled, onChange }: PlaceFormInputPhotoProps) => {
    const t = useTranslations()
    const toast = useToast()

    const [photos, setPhotos] = useState<UploadingImage[]>(
        initialPhotos.map(photo => ({
            key: crypto.randomUUID(),
            file: null,
            uploadedPhotoUrl: photo.url,
            uploadedPhotoIsCover: photo.isCover,
            status: UploadingImageStatus.SUCCESS,
        })),
    )
    const [upload] = placesAPI.usePlacePhotoUploadMutation()
    const [indexSlide, setIndexSlide] = useState<number>(-1)

    useEffect(() => {
        const someUploading = photos.some(({ status }) => status === UploadingImageStatus.UPLOADING)
        setIsFormDisabled(someUploading)
    }, [photos, setIsFormDisabled])

    useEffect(() => {
        const allUploadsFinished = photos.every(({ status }) => status !== UploadingImageStatus.UPLOADING)

        if (allUploadsFinished) {
            const hasCover = photos.some(photo => photo.uploadedPhotoIsCover)

            if (!hasCover) {
                const firstSuccessfulPhoto = photos.find(({ status }) => status === UploadingImageStatus.SUCCESS)

                if (firstSuccessfulPhoto) {
                    updatePhoto(firstSuccessfulPhoto.key, { uploadedPhotoIsCover: true })
                }
            }
        }

        const result = photos.map(photo => ({ url: photo.uploadedPhotoUrl, isCover: photo.uploadedPhotoIsCover }))
        onChange(result)
        // todo: fix this eslint-disable-line
    }, [photos]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleFileInputChange = async (files: FileList) => {
        Array.from(files).forEach(async file => {
            const key = crypto.randomUUID()
            addPhoto(key, file)
            await uploadPhoto(key, file)
        })
    }

    const addPhoto = (key: string, file: File) => {
        setPhotos(prev => [
            ...prev,
            { key, file, uploadedPhotoUrl: '', uploadedPhotoIsCover: false, status: UploadingImageStatus.UPLOADING },
        ])
    }

    const updatePhoto = (key: string, updatedFields: Partial<UploadingImage>) => {
        setPhotos(prev => prev.map(photo => (photo.key === key ? { ...photo, ...updatedFields } : photo)))
    }

    const uploadPhoto = async (key: string, file: File) => {
        try {
            const response = await upload(file).unwrap()
            updatePhoto(key, { status: UploadingImageStatus.SUCCESS, uploadedPhotoUrl: response.url })
        } catch {
            toast.error(t('common.error'))
            updatePhoto(key, { status: UploadingImageStatus.ERROR })
        }
    }

    const handleDelete = (key: string) => {
        setPhotos(prev => prev.filter(photo => photo.key !== key))
    }

    const handleSetAsCover = (key: string) => {
        setPhotos(prev => prev.map(photo => ({ ...photo, uploadedPhotoIsCover: photo.key === key })))
    }

    const handleRetry = async (key: string) => {
        const photo = photos.find(photo => photo.key === key)

        if (!photo || !photo.file) {
            return
        }

        updatePhoto(key, { status: UploadingImageStatus.UPLOADING })
        await uploadPhoto(key, photo.file)
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
                                url={photo.uploadedPhotoUrl}
                                isCover={photo.uploadedPhotoIsCover}
                                status={photo.status}
                                onClick={() => setIndexSlide(index)}
                                onDelete={() => handleDelete(photo.key)}
                                onSetAsCover={() => handleSetAsCover(photo.key)}
                                onRetry={() => handleRetry(photo.key)}
                            />
                        ))}

                        <Lightbox
                            open={indexSlide >= 0}
                            close={() => setIndexSlide(-1)}
                            index={indexSlide}
                            slides={photos.map(photo => ({
                                src: makeImageUrl(photo.uploadedPhotoUrl, ImageVariants.PUBLIC),
                            }))}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
