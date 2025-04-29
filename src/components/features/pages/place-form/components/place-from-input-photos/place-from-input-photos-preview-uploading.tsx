import { Spinner } from '@/components/ui/spinner'

export const PlaceFormInputPhotosPreviewUploading = () => {
    return (
        <div className="flex-center aspect-square size-full rounded-lg border border-black-15 text-black-15">
            <Spinner size={36} />
        </div>
    )
}
