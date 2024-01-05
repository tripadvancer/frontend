import { Photo } from '@/components/photo'

type PhotoPreviewProps = {
    url: string
    alt: string
    size: number
    onPhotoClick: () => void
    onPhotoDelete: () => void
}

export const PhotoPreview = ({ url, alt, size, onPhotoClick, onPhotoDelete }: PhotoPreviewProps) => {
    return (
        <div className="relative">
            <div
                className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-red-10 text-red-100"
                onClick={onPhotoDelete}
            >
                {/* prettier-ignore */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7 0H9C10.1046 0 11 0.89543 11 2H14C15.1046 2 16 2.89543 16 4V5C16 6.10457 15.1046 7 14 7H13.9199L13 14C13 15.1046 12.1046 16 11 16H5C3.89543 16 3 15.1046 3.00345 14.083L2.07987 7H2C0.89543 7 0 6.10457 0 5V4C0 2.89543 0.89543 2 2 2H5C5 0.89543 5.89543 0 7 0ZM2 4H14V5H2V4ZM4.08649 7H11.9132L11.0035 13.917L11 14H5L4.08649 7Z" />
                </svg>
            </div>

            <Photo url={url} size={size} alt={alt} onClick={onPhotoClick} />
        </div>
    )
}
