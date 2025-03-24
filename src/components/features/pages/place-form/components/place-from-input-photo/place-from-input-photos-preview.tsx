import { UploadingImageStatus } from '@/utils/enums'

import { PlaceFormInputPhotosPreviewError } from './place-from-input-photos-preview-error'
import { PlaceFormInputPhotosPreviewSuccess } from './place-from-input-photos-preview-success'
import { PlaceFormInputPhotosPreviewUploading } from './place-from-input-photos-preview-uploading'

type PlaceFormInputPhotoPreviewProps = {
    url: string
    isCover: boolean
    status: UploadingImageStatus
    onClick: () => void
    onAddAttribute: () => void
    onSetAsCover: () => void
    onDelete: () => void
    onRetry: () => void
}

export const PlaceFormInputPhotosPreview = ({
    url,
    isCover,
    status,
    onClick,
    onAddAttribute,
    onSetAsCover,
    onDelete,
    onRetry,
}: PlaceFormInputPhotoPreviewProps) => {
    if ([UploadingImageStatus.READY, UploadingImageStatus.UPLOADING].includes(status)) {
        return <PlaceFormInputPhotosPreviewUploading />
    }

    if ([UploadingImageStatus.ERROR].includes(status)) {
        return <PlaceFormInputPhotosPreviewError onDelete={onDelete} onRetry={onRetry} />
    }

    return (
        <PlaceFormInputPhotosPreviewSuccess
            url={url}
            isCover={isCover}
            onClick={onClick}
            onAddAttribute={onAddAttribute}
            onSetAsCover={onSetAsCover}
            onDelete={onDelete}
        />
    )
}
