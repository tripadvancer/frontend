import { is } from 'immutable'

import { Spinner } from '@/components/spinner'

type InputFileProps = {
    error?: string
    className?: string
    isUploading?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputFile = ({ error, className, isUploading, onChange }: InputFileProps) => {
    return (
        <div className={className}>
            <div className="relative">
                <input
                    type="file"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={onChange}
                />

                <div className="hover-animated flex h-10 w-full cursor-pointer items-center rounded-lg border border-black-15 bg-white pl-4 pr-9">
                    Select file ...
                </div>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-black-15">
                    {isUploading ? (
                        <Spinner size={16} />
                    ) : (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16 5C16 3.89543 15.1046 3 14 3H8.00179C8.04192 2.99978 8.02918 2.98428 7.94123 2.87732C7.91963 2.85104 7.89349 2.81925 7.86248 2.78082C7.83182 2.74281 7.74603 2.63225 7.67056 2.535C7.61708 2.46609 7.56879 2.40385 7.54898 2.37885C6.83294 1.47545 6.12 1 5 1H2C0.89543 1 0 1.89543 0 3V13C0 14.1046 0.89543 15 2 15H14C15.1046 15 16 14.1046 16 13V5ZM14 5V13H2V3H5C5.38424 3 5.60702 3.14857 5.9816 3.62116C5.99337 3.63601 6.02712 3.67952 6.06918 3.73374C6.14956 3.83735 6.26027 3.98006 6.30583 4.03654C6.80869 4.65991 7.27649 4.99614 7.99465 4.99999L14 5Z"
                                fill="#D9DBDD"
                            />
                        </svg>
                    )}
                </div>
            </div>

            {error && <div className="mt-1 text-small text-red-100">{error}</div>}
        </div>
    )
}
