'use client'

import { ChangeEvent, useRef } from 'react'

import classNames from 'classnames'
import { CameraIcon, CameraOffIcon } from 'lucide-react'

import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'

type PlaceFormInputPhotosFileinputProps = {
    photosLength: number
    onChange: (files: FileList) => void
}

export const PlaceFormInputPhotosFileinput = ({ photosLength, onChange }: PlaceFormInputPhotosFileinputProps) => {
    const settings = useAppSettings()
    const toast = useToast()
    const maxPhotosCount = settings?.validation.place.photos.maxCount ?? 0
    const maxFileSize = settings?.validation.common.maxFileSize ?? 0

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
        const oversizedFile = Array.from(files).find(file => file.size > maxFileSize)

        if (files.length + photosLength > maxPhotosCount) {
            toast.error(`You can upload up to ${maxPhotosCount} files`)
            return
        }

        if (oversizedFile) {
            toast.error(`The file size must not exceed ${maxFileSize / 1000000} MB`)
            return
        }

        onChange(files)
    }

    return (
        <div
            className={classNames(
                'flex-center hover-animated border-blue-20 aspect-square size-full cursor-pointer rounded-2xl border text-blue-100',
                {
                    'hover:border-blue-active hover:text-blue-active': photosLength < maxPhotosCount,
                    'cursor-not-allowed! opacity-30': photosLength >= maxPhotosCount,
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
