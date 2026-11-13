import { ChangeEvent, useRef, useState } from 'react'

import classNames from 'classnames'
import { FolderIcon } from 'lucide-react'

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
            setError(`You can upload up to ${maxFilesCount} files`)
            return
        }

        if (fileSize > maxFileSize) {
            setError(`The file size must not exceed ${maxFileSize / 1000000} MB`)
            return
        }

        onChange(e.target.files)
    }

    return (
        <div className={className}>
            <div className="relative">
                {multiple && (
                    <div className="text-black-40 absolute -top-7 right-0">
                        {currentFilesLength} / {maxFilesCount}
                    </div>
                )}

                <div className="relative">
                    <div
                        className={classNames(
                            'hover-animated flex h-10 w-full items-center rounded-lg border bg-white pr-9 pl-4',
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
                                <div className="text-black-40">Loading ...</div>
                                <div className="text-black-15 absolute top-1/2 right-3 -translate-y-1/2">
                                    <Spinner size={16} />
                                </div>
                            </>
                        )}

                        {!isUploading && (
                            <>
                                {fileName ? (
                                    <div className="text-black-100 min-w-0 truncate" title={fileName}>
                                        {fileName}
                                    </div>
                                ) : (
                                    <div className="text-black-40">Select file ...</div>
                                )}
                                <div className="absolute top-1/2 right-3 -translate-y-1/2">
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

            {error && <div className="text-small mt-1 text-red-100">{error}</div>}
        </div>
    )
}
