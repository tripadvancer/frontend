'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { ConfirmationMini } from '@/components/confirmation-mini'
import { FileInput } from '@/components/forms/file-input/file-input'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { deleteUserAvatar, updateUserAvatar } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

const maxFileSize = validationConfig.common.maxFileSize

type AvatarUploaderProps = {
    currentAvatar: string | null
}

export const AvatarUploader = ({ currentAvatar }: AvatarUploaderProps) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()

    const [fileName, setFileName] = useState<string>('')
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isRemoveAvatarConfirm, setIsRemoveAvatarConfirm] = useState<boolean>(false)

    const handleChangeFileInput = async (files: FileList) => {
        const file = files[0]

        try {
            setIsUploading(true)
            await updateUserAvatar(file as File)
            toast.success(t('pages.user.settings.avatar.update.success'))
            router.refresh()
        } catch {
            toast.error(t('common.error'))
            setFileName('')
        } finally {
            setFileName(file.name)
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
            toast.success(t('pages.user.settings.avatar.update.success'))
            router.refresh()
        } catch {
            toast.error(t('common.error'))
        } finally {
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
                        <div className="link-red" onClick={handleClickRemoveAvatar}>
                            {t('common.action.delete')}
                        </div>
                    )}
                </div>
            )}

            <FileInput
                fileName={fileName}
                maxFileSize={maxFileSize}
                isUploading={isUploading}
                onChange={handleChangeFileInput}
            />
        </div>
    )
}
