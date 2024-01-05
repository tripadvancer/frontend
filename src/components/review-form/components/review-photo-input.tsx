'use client'

import { FileInput } from '@/components/forms/file-input/file-input'
import { validationConfig } from '@/configs/validation.config'

const maxFilesCount = validationConfig.review.photos.maxCount
const maxFileSize = validationConfig.common.maxFileSize

type ReviewPhotoInputProps = {
    currentPhotosCount: number
    isUploading: boolean
    onChange: (files: FileList) => void
}

export const ReviewPhotoInput = ({ currentPhotosCount, isUploading, onChange }: ReviewPhotoInputProps) => {
    return (
        <FileInput
            multiple
            maxFilesCount={maxFilesCount}
            maxFileSize={maxFileSize}
            currentFilesLength={currentPhotosCount}
            isUploading={isUploading}
            onChange={onChange}
        />
    )
}
