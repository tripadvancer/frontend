'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAppSettings } from '@/components/providers/settings-provider'
import { useToast } from '@/components/providers/toast-provider'
import { ConfirmationMini } from '@/components/ui/confirmation-mini'
import { FormFileInput } from '@/components/ui/form-file-input'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { userAPI } from '@/utils/redux/services/user/user.api'

type AvatarUploaderProps = {
    currentAvatar: string | null
}

export const UserSettingsAvatarUploader = ({ currentAvatar }: AvatarUploaderProps) => {
    const settings = useAppSettings()
    const router = useRouter()
    const toast = useToast()

    const [fileName, setFileName] = useState<string>('')
    const [isDeleteAvatarConfirm, setIsDeleteAvatarConfirm] = useState<boolean>(false)

    const [updateUserAvatar, { isLoading: isUploading }] = userAPI.useUpdateUserAvatarMutation()
    const [deleteUserAvatar, { isLoading: isDeleting }] = userAPI.useDeleteUserAvatarMutation()
    const maxFileSize = settings?.validation.common.maxFileSize ?? 0

    const handleChangeFileInput = async (files: FileList) => {
        const file = files[0]

        try {
            const formData = new FormData()
            formData.append('file', file)
            await updateUserAvatar(formData)
            toast.success('Your avatar has been updated.')
            setFileName(file.name)
            router.refresh()
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
            setFileName('')
        }
    }

    const handleClickDeleteAvatar = () => {
        setIsDeleteAvatarConfirm(true)
    }

    const handleCancelDeleteAvatar = () => {
        setIsDeleteAvatarConfirm(false)
    }

    const handleConfirmDeleteAvatar = async () => {
        try {
            await deleteUserAvatar()
            toast.success('Your avatar has been updated.')
            router.refresh()
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
        } finally {
            setFileName('')
            setIsDeleteAvatarConfirm(false)
        }
    }

    return (
        <div className="relative">
            {currentAvatar && (
                <div className="absolute -top-7 right-0">
                    {isDeleteAvatarConfirm ? (
                        <ConfirmationMini onConfirm={handleConfirmDeleteAvatar} onCancel={handleCancelDeleteAvatar} />
                    ) : (
                        <div className="link-red" onClick={handleClickDeleteAvatar}>
                            Delete
                        </div>
                    )}
                </div>
            )}

            <FormFileInput
                fileName={fileName}
                maxFileSize={maxFileSize}
                isUploading={isUploading || isDeleting}
                isDisabled={!settings}
                onChange={handleChangeFileInput}
            />
        </div>
    )
}
