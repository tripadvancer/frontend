'use client'

import { useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { deleteUserAvatar, updateUserAvatar } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ConfirmationMini } from '../confirmation-mini'
import { FileInput } from '../forms/file-input/file-input'

const maxFileSize = validationConfig.common.maxFileSize

type UserSettingsAvatarProps = {
    currentAvatar: string | null
}

export const UserSettingsAvatar = ({ currentAvatar }: UserSettingsAvatarProps) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()

    const [fileName, setFileName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isRemoveAvatarConfirm, setIsRemoveAvatarConfirm] = useState<boolean>(false)

    const handleChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) {
            return
        }

        const file = e.target.files[0]
        const fileSize = e.target.files[0].size

        setError('')
        setFileName(e.target.files[0].name)

        if (fileSize && fileSize > maxFileSize) {
            setError(t('forms.validation.file.max_size', { size: maxFileSize / 1000000 }))
            return
        }

        try {
            setIsUploading(true)
            await updateUserAvatar(file as File)
            toast.success(t('pages.user.settings.forms.upload_avatar.success'))
            router.refresh()
        } catch {
            toast.error(t('common.error'))
            setFileName('')
        } finally {
            setError('')
            setIsUploading(false)
        }
    }

    const handleClickRemoveAvatar = () => {
        setIsRemoveAvatarConfirm(true)
    }

    const handleCancelRemoveAvatar = () => {
        setIsRemoveAvatarConfirm(false)
    }

    const handleConfirmRemoveAvatar = async () => {
        try {
            setIsUploading(true)
            await deleteUserAvatar()
            toast.success(t('pages.user.settings.forms.upload_avatar.success'))
            router.refresh()
        } catch {
            toast.error(t('common.error'))
        } finally {
            setError('')
            setFileName('')
            setIsUploading(false)
            setIsRemoveAvatarConfirm(false)
        }
    }

    return (
        <div className="relative">
            {currentAvatar && (
                <div className="absolute -top-7 right-0">
                    {isRemoveAvatarConfirm ? (
                        <ConfirmationMini onConfirm={handleConfirmRemoveAvatar} onCancel={handleCancelRemoveAvatar} />
                    ) : (
                        <div className="cursor-pointer text-red-100" onClick={handleClickRemoveAvatar}>
                            {t('common.cta.delete')}
                        </div>
                    )}
                </div>
            )}

            <FileInput fileName={fileName} error={error} isUploading={isUploading} onChange={handleChangeFileInput} />
        </div>
    )
}
