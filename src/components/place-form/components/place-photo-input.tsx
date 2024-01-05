'use client'

import { ChangeEvent, useRef, useState } from 'react'

import classNames from 'classnames'

import { Spinner } from '@/components/spinner'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxFileSize = validationConfig.common.maxFileSize

type PlacePhotoInputProps = {
    currentPhotosCount: number
    maxPhotosCount: number
    isUploading: boolean
    onChange: (files: FileList) => void
}

export const PlacePhotoInput = ({
    currentPhotosCount,
    maxPhotosCount,
    isUploading,
    onChange,
}: PlacePhotoInputProps) => {
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
                'hover-animated flex aspect-square size-full cursor-pointer items-center justify-center rounded-lg border border-blue-20 text-blue-100 enabled:hover:border-blue-active enabled:hover:text-blue-active',
                {
                    'cursor-not-allowed opacity-30': currentPhotosCount >= maxPhotosCount,
                    'cursor-wait': isUploading,
                },
            )}
            onClick={handleClickFileInput}
        >
            {isUploading ? (
                <Spinner size={48} />
            ) : (
                // prettier-ignore
                <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 20C40 21.1046 39.1046 22 38 22C36.8954 22 36 21.1046 36 20C36 18.8954 36.8954 18 38 18C39.1046 18 40 18.8954 40 20Z" />
                    <path fillRule="evenodd" d="M14 26C14 31.5228 18.4772 36 24 36C29.5228 36 34 31.5228 34 26C34 20.4772 29.5228 16 24 16C18.4772 16 14 20.4772 14 26ZM30 26C30 29.3137 27.3137 32 24 32C20.6863 32 18 29.3137 18 26C18 22.6863 20.6863 20 24 20C27.3137 20 30 22.6863 30 26Z" />
                    <path fillRule="evenodd" d="M13.874 11.6908C14.0157 11.4938 14.1731 11.2526 14.3738 10.9274C14.4471 10.8087 14.647 10.4789 14.7958 10.2333L14.9636 9.95682C16.6216 7.24477 17.8268 6 20 6H28C30.1732 6 31.3784 7.24477 33.0364 9.95682L33.2042 10.2333C33.353 10.4789 33.5529 10.8087 33.6262 10.9274C33.8269 11.2526 33.9843 11.4938 34.126 11.6908C34.2194 11.8207 34.301 11.9239 34.3676 12H40C43.3137 12 46 14.6863 46 18V36C46 39.3137 43.3137 42 40 42H8C4.68629 42 2 39.3137 2 36V18C2 14.6863 4.68629 12 8 12H13.6324C13.699 11.9239 13.7806 11.8207 13.874 11.6908ZM8 16C6.89543 16 6 16.8954 6 18V36C6 37.1046 6.89543 38 8 38H40C41.1046 38 42 37.1046 42 36V18C42 16.8954 41.1046 16 40 16H34C32.6713 16 31.7753 15.2728 30.8788 14.0265C30.6725 13.7398 30.4682 13.4266 30.2223 13.0282C30.138 12.8917 29.9193 12.5307 29.7691 12.283L29.6236 12.0432C28.719 10.5634 28.1735 10 28 10H20C19.8265 10 19.281 10.5634 18.3764 12.0432L18.2309 12.283C18.0808 12.5307 17.8618 12.8919 17.7777 13.0282C17.5318 13.4266 17.3275 13.7398 17.1212 14.0265C16.2247 15.2728 15.3287 16 14 16H8Z" />
                </svg>
            )}

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
