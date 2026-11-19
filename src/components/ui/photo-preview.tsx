import { TrashIcon } from 'lucide-react'

import { Photo } from '@/components/ui/photo'

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
                className="flex-center bg-red-10 absolute top-0 right-0 h-8 w-8 cursor-pointer rounded-lg text-red-100"
                onClick={onPhotoDelete}
            >
                <TrashIcon size={16} />
            </div>
            <Photo url={url} size={size} alt={alt} onClick={onPhotoClick} />
        </div>
    )
}
