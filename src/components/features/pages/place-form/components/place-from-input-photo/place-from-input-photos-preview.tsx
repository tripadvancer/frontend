import { UploadingImageStatus } from '@/utils/enums'

import { PlaceFormInputPhotosPreviewError } from './place-from-input-photos-preview-error'
import { PlaceFormInputPhotosPreviewSuccess } from './place-from-input-photos-preview-success'
import { PlaceFormInputPhotosPreviewUploading } from './place-from-input-photos-preview-uploading'

type PlaceFormInputPhotoPreviewProps = {
    url: string
    isCover: boolean
    status: UploadingImageStatus
    onClick: () => void
    onDelete: () => void
    onSetAsCover: () => void
    onRetry: () => void
}

export const PlaceFormInputPhotosPreview = ({
    url,
    isCover,
    status,
    onClick,
    onDelete,
    onSetAsCover,
    onRetry,
}: PlaceFormInputPhotoPreviewProps) => {
    if (status === UploadingImageStatus.UPLOADING) {
        return <PlaceFormInputPhotosPreviewUploading />
    }

    if (status === UploadingImageStatus.ERROR) {
        return <PlaceFormInputPhotosPreviewError onDelete={onDelete} onRetry={onRetry} />
    }

    return (
        <PlaceFormInputPhotosPreviewSuccess
            url={url}
            isCover={isCover}
            onClick={onClick}
            onDelete={onDelete}
            onSetAsCover={onSetAsCover}
        />
    )
}
