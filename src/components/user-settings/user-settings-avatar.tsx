'use client'

import { useRef, useState } from 'react'

import classNames from 'classnames'

import { useRouter } from 'next/navigation'

import { Spinner } from '@/components/spinner'
import { validationConfig } from '@/configs/validation.config'
import { useToast } from '@/providers/toast-provider'
import { deleteUserAvatar, updateUserAvatar } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

import { ConfirmationMini } from '../confirmation-mini'

const maxFileSize = validationConfig.common.maxFileSize

type UserSettingsAvatarProps = {
    currentAvatar: string | null
}

export const UserSettingsAvatar = ({ currentAvatar }: UserSettingsAvatarProps) => {
    const t = useI18n()
    const router = useRouter()
    const toast = useToast()

    // Create a reference to the hidden file input element
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [fileName, setFileName] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isRemoveAvatarConfirm, setIsRemoveAvatarConfirm] = useState<boolean>(false)

    // Programatically click the hidden file input element
    // when the fake file input element is clicked
    const handleClickFileInput = () => {
        hiddenFileInput.current?.click()
    }

    const handleChangeFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
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
        <div>
            <div className="relative cursor-pointer">
                {currentAvatar && (
                    <div className="absolute -top-7 right-0">
                        {isRemoveAvatarConfirm ? (
                            <ConfirmationMini
                                onConfirm={handleConfirmRemoveAvatar}
                                onCancel={handleCancelRemoveAvatar}
                            />
                        ) : (
                            <div className="cursor-pointer text-red-100" onClick={handleClickRemoveAvatar}>
                                {t('common.cta.delete')}
                            </div>
                        )}
                    </div>
                )}

                <div
                    className={classNames(
                        'hover-animated flex h-10 w-full items-center rounded-lg border bg-white pl-4 pr-9',
                        {
                            'border-red-100': error,
                            'border-black-15 focus:border-black-40': !error,
                        },
                    )}
                    onClick={handleClickFileInput}
                >
                    {fileName ? fileName : <div className="text-black-40">{t('forms.fields.file.placeholder')}</div>}
                </div>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black-15">
                    {isUploading ? (
                        <Spinner size={16} />
                    ) : (
                        // prettier-ignore
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16 5C16 3.89543 15.1046 3 14 3H8.00179C8.04192 2.99978 8.02918 2.98428 7.94123 2.87732C7.91963 2.85104 7.89349 2.81925 7.86248 2.78082C7.83182 2.74281 7.74603 2.63225 7.67056 2.535C7.61708 2.46609 7.56879 2.40385 7.54898 2.37885C6.83294 1.47545 6.12 1 5 1H2C0.89543 1 0 1.89543 0 3V13C0 14.1046 0.89543 15 2 15H14C15.1046 15 16 14.1046 16 13V5ZM14 5V13H2V3H5C5.38424 3 5.60702 3.14857 5.9816 3.62116C5.99337 3.63601 6.02712 3.67952 6.06918 3.73374C6.14956 3.83735 6.26027 3.98006 6.30583 4.03654C6.80869 4.65991 7.27649 4.99614 7.99465 4.99999L14 5Z" />
                        </svg>
                    )}
                </div>

                <input
                    ref={hiddenFileInput}
                    type="file"
                    className="hidden"
                    accept="image/jpg, image/jpeg, image/png, image/webp"
                    onChange={handleChangeFileInput}
                />
            </div>

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}
