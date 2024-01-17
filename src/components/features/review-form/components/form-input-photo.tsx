'use client'

import { FormFileInput } from '@/components/ui/form-file-input'
import { validationConfig } from '@/configs/validation.config'

const maxFilesCount = validationConfig.review.photos.maxCount
const maxFileSize = validationConfig.common.maxFileSize

type FormInputPhotoProps = {
    currentPhotosCount: number
    isUploading: boolean
    onChange: (files: FileList) => void
}

export const FormInputPhoto = ({ currentPhotosCount, isUploading, onChange }: FormInputPhotoProps) => {
    return (
        <FormFileInput
            multiple
            maxFilesCount={maxFilesCount}
            maxFileSize={maxFileSize}
            currentFilesLength={currentPhotosCount}
            isUploading={isUploading}
            onChange={onChange}
        />
    )
}
