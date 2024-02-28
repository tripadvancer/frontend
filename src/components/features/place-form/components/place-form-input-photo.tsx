'use client'

import { ChangeEvent, useRef } from 'react'

import classNames from 'classnames'

import { CameraIcon48 } from '@/components/ui/icons'
import { Spinner } from '@/components/ui/spinner'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxFileSize = validationConfig.common.maxFileSize

type PlaceFormInputPhotoProps = {
    currentPhotosCount: number
    maxPhotosCount: number
    isUploading: boolean
    onChange: (files: FileList) => void
}

export const PlaceFormInputPhoto = ({
    currentPhotosCount,
    maxPhotosCount,
    isUploading,
    onChange,
}: PlaceFormInputPhotoProps) => {
    const t = useI18n()
    const toast = useToast()

    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    // Programatically click the hidden file input element
    // when the fake file input element is clicked
    const handleClickFileInput = () => {
        hiddenFileInput.current?.click()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            return
        }

        const files = e.target.files
        const fileSize = e.target.files[0].size

        if (files.length + currentPhotosCount > maxPhotosCount) {
            toast.error(t('validation.file.max_count', { count: maxPhotosCount }))
            return
        }

        if (fileSize > maxFileSize) {
            toast.error(t('validation.file.max_size', { size: maxFileSize / 1000000 }))
            return
        }

        onChange(e.target.files)
    }

    return (
        <div
            className={classNames(
                'hover-animated flex-center aspect-square size-full cursor-pointer rounded-lg border border-blue-20 text-blue-100 hover:border-blue-active hover:text-blue-active',
                {
                    'pointer-events-none cursor-not-allowed opacity-30': currentPhotosCount >= maxPhotosCount,
                    'pointer-events-none cursor-wait': isUploading,
                },
            )}
            onClick={handleClickFileInput}
        >
            {isUploading ? <Spinner size={48} /> : <CameraIcon48 />}

            <input
                ref={hiddenFileInput}
                type="file"
                className="hidden"
                accept="image/jpg, image/jpeg, image/png, image/webp"
                multiple
                disabled={isUploading || currentPhotosCount >= maxPhotosCount}
                onChange={handleChange}
            />
        </div>
    )
}
