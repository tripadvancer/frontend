'use client'

import { useRef, useState } from 'react'

import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { placeCoverUpload } from '@/services/places'
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

    const [isUploading, setIsUploading] = useState<boolean>(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0]
            const fileSize = e.target.files[0].size

            if (fileSize > maxFileSize) {
                toast.error(t('validation.file.max_size', { size: maxFileSize / 1000000 }))
                return
            }

            try {
                setIsUploading(true)
                const res = await placeCoverUpload(file)
                onChange(res.url)
            } catch {
                toast.error(t('common.error'))
            } finally {
                setIsUploading(false)
            }
        }
    }

    if (isUploading) {
        return <div className="font-medium text-white">Uploading...</div>
    }

    return (
        <div>
            <div className="link-white font-medium" onClick={() => hiddenFileInput.current?.click()}>
                {t('placeholder.action.place.cover')}
            </div>

            <input
                ref={hiddenFileInput}
                type="file"
                className="hidden"
                accept="image/jpg, image/jpeg, image/png, image/webp"
                disabled={isUploading}
                onChange={handleFileChange}
            />
        </div>
    )
}
