import { Spinner } from '@/components/ui/spinner'

export const PlaceFormInputPhotosPreviewUploading = () => {
    return (
        <div className="flex-center border-black-15 text-black-15 aspect-square size-full rounded-lg border">
            <Spinner size={36} />
        </div>
    )
}
