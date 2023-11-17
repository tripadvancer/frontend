'use client'

import { useState } from 'react'

import Image from 'next/image'

import { FileInput } from '@/components/forms/file-input/file-input'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { reviewPhotosUpload } from '@/services/reviews'
import { ImageVariant } from '@/utils/enums'
import { makeImageUrl } from '@/utils/helpers'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxFilesCount = validationConfig.review.photos.maxCount
const maxFileSize = validationConfig.common.maxFileSize

type ReviewPhotosUploaderProps = {
    photos: string[]
    onChange: (url: string[]) => void
}

export const ReviewPhotosUploader = ({ photos, onChange }: ReviewPhotosUploaderProps) => {
    const t = useI18n()
    const toast = useToast()

    const [isUploading, setIsUploading] = useState<boolean>(false)

    const handleChangeFileInput = async (files: FileList) => {
        const uploadPromises = Array.from(files).map(async file => {
            try {
                setIsUploading(true)
                const res = await reviewPhotosUpload(file as File)
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

    const handlePhotoRemove = (url: string) => {
        onChange(photos.filter(photo => photo !== url))
    }

    return (
        <div className="flex flex-col gap-y-2">
            <FileInput
                multiple
                maxFilesCount={maxFilesCount}
                maxFileSize={maxFileSize}
                currentFilesLength={photos.length}
                isUploading={isUploading}
                onChange={handleChangeFileInput}
            />

            <div className="flex gap-x-2">
                {photos.map(photo => (
                    <div key={photo} className="relative">
                        <div
                            className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-red-10 text-red-100"
                            onClick={() => handlePhotoRemove(photo)}
                        >
                            {/* prettier-ignore */}
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7 0H9C10.1046 0 11 0.89543 11 2H14C15.1046 2 16 2.89543 16 4V5C16 6.10457 15.1046 7 14 7H13.9199L13 14C13 15.1046 12.1046 16 11 16H5C3.89543 16 3 15.1046 3.00345 14.083L2.07987 7H2C0.89543 7 0 6.10457 0 5V4C0 2.89543 0.89543 2 2 2H5C5 0.89543 5.89543 0 7 0ZM2 4H14V5H2V4ZM4.08649 7H11.9132L11.0035 13.917L11 14H5L4.08649 7Z" />
                            </svg>
                        </div>
                        <Image
                            src={makeImageUrl(photo, ImageVariant.PREVIEW)}
                            width={64}
                            height={64}
                            className="rounded-lg"
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
