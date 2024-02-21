import { DeleteIcon16 } from '@/components/ui/icons'
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
                className="flex-center absolute right-0 top-0 h-8 w-8 cursor-pointer rounded-lg bg-red-10 text-red-100"
                onClick={onPhotoDelete}
            >
                <DeleteIcon16 />
            </div>
            <Photo url={url} size={size} alt={alt} onClick={onPhotoClick} />
        </div>
    )
}
