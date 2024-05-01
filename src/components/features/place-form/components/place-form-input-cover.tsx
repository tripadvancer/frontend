'use client'

import { ChangeEvent, useRef } from 'react'

import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { placesAPI } from '@/redux/services/places-api'
import { useI18n } from '@/utils/i18n/i18n.client'

type PlaceFormInputCoverProps = {
    value: string | null
    onChange: (value: string | null) => void
}

const maxFileSize = validationConfig.common.maxFileSize

export const PlaceFormInputCover = ({ value, onChange }: PlaceFormInputCoverProps) => {
    const t = useI18n()
    const toast = useToast()
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [upload, { isLoading }] = placesAPI.usePlaceCoverUploadMutation()

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0]
            const fileSize = e.target.files[0].size

            if (fileSize > maxFileSize) {
                toast.error(t('validation.file.max_size', { size: maxFileSize / 1000000 }))
                return
            }

            try {
                const formData = new FormData()
                formData.append('file', file)
                const response = await upload(formData).unwrap()
                onChange(response.url)
            } catch {
                toast.error(t('common.error'))
            }
        }
    }

    if (isLoading) {
        return <div className="text-center font-medium text-white">{t('placeholder.file.loading')}</div>
    }

    return (
        <div>
            <div className="link-white text-center font-medium" onClick={() => hiddenFileInput.current?.click()}>
                {t('placeholder.action.place.cover')}
            </div>

            <input
                ref={hiddenFileInput}
                type="file"
                className="hidden"
                accept="image/jpg, image/jpeg, image/png, image/webp"
                disabled={isLoading}
                onChange={handleFileChange}
            />
        </div>
    )
}
