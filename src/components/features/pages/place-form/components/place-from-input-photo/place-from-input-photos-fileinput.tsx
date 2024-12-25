'use client'

import { ChangeEvent, useRef } from 'react'

import classNames from 'classnames'
import { CameraIcon, CameraOffIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'

type PlaceFormInputPhotosFileinputProps = {
    photosLength: number
    onChange: (files: FileList) => void
}

const maxPhotosCount = validationConfig.place.photos.maxCount
const maxFileSize = validationConfig.common.maxFileSize

export const PlaceFormInputPhotosFileinput = ({ photosLength, onChange }: PlaceFormInputPhotosFileinputProps) => {
    const t = useTranslations()
    const toast = useToast()

    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    // Programatically click the hidden file input element
    // when the fake file input element is clicked
    const handleClickFileInput = () => {
        hiddenFileInput.current?.click()
    }

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            return
        }

        const files = e.target.files
        const fileSize = e.target.files[0].size

        if (files.length + photosLength > maxPhotosCount) {
            toast.error(t('validation.file.maxCount', { count: maxPhotosCount }))
            return
        }

        if (fileSize > maxFileSize) {
            toast.error(t('validation.file.maxSize', { size: maxFileSize / 1000000 }))
            return
        }

        onChange(files)
    }

    return (
        <div
            className={classNames(
                'flex-center hover-animated aspect-square size-full cursor-pointer rounded-lg border border-blue-20 text-blue-100',
                {
                    'hover:border-blue-active hover:text-blue-active': photosLength < maxPhotosCount,
                    '!cursor-not-allowed opacity-30': photosLength >= maxPhotosCount,
                },
            )}
            onClick={photosLength >= maxPhotosCount ? undefined : handleClickFileInput}
        >
            <input
                ref={hiddenFileInput}
                type="file"
                className="hidden"
                accept="image/jpg, image/jpeg, image/png, image/webp"
                multiple
                disabled={photosLength >= maxPhotosCount}
                onChange={handleChange}
            />
            {photosLength < maxPhotosCount ? <CameraIcon size={48} /> : <CameraOffIcon size={48} />}
        </div>
    )
}
