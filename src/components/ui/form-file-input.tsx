import { ChangeEvent, useRef, useState } from 'react'

import classNames from 'classnames'
import { FolderIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Spinner } from '@/components/ui/spinner'

type FormFileInputProps = {
    fileName?: string
    className?: string
    multiple?: boolean
    maxFilesCount?: number
    maxFileSize: number
    currentFilesLength?: number
    isUploading?: boolean
    onChange: (files: FileList) => void
}

export const FormFileInput = ({
    fileName,
    className,
    multiple,
    maxFilesCount = 1,
    maxFileSize,
    currentFilesLength = 0,
    isUploading,
    onChange,
}: FormFileInputProps) => {
    const t = useTranslations()

    const [error, setError] = useState<string>('')

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

        setError('')

        if (files.length + currentFilesLength > maxFilesCount) {
            setError(t('validation.file.maxCount', { count: maxFilesCount }))
            return
        }

        if (fileSize > maxFileSize) {
            setError(t('validation.file.maxSize', { size: maxFileSize / 1000000 }))
            return
        }

        onChange(e.target.files)
    }

    return (
        <div className={className}>
            <div className="relative">
                {multiple && (
                    <div className="absolute -top-7 right-0 text-black-40">
                        {currentFilesLength} / {maxFilesCount}
                    </div>
                )}

                <div className="relative">
                    <div
                        className={classNames(
                            'hover-animated flex h-10 w-full items-center rounded-lg border bg-white pl-4 pr-9',
                            {
                                'border-red-100': error,
                                'border-black-15 text-black-15 hover:border-black-40 hover:text-black-40': !error,
                                'cursor-pointer': !isUploading && currentFilesLength < maxFilesCount,
                                'cursor-wait': isUploading,
                                'cursor-default opacity-30': multiple && currentFilesLength >= maxFilesCount,
                            },
                        )}
                        onClick={handleClickFileInput}
                    >
                        {isUploading && (
                            <>
                                <div className="text-black-40">{t('common.loading')}</div>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black-15">
                                    <Spinner size={16} />
                                </div>
                            </>
                        )}

                        {!isUploading && (
                            <>
                                {fileName ? (
                                    <div className="text-black-100">{fileName}</div>
                                ) : (
                                    <div className="text-black-40">{t('placeholder.action.selectFile')}</div>
                                )}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <FolderIcon size={16} />
                                </div>
                            </>
                        )}
                    </div>

                    <input
                        ref={hiddenFileInput}
                        type="file"
                        className="hidden"
                        accept="image/jpg, image/jpeg, image/png, image/webp"
                        multiple={multiple}
                        disabled={isUploading || (multiple && currentFilesLength >= maxFilesCount)}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}
