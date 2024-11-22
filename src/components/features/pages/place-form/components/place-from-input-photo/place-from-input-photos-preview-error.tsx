import { Dropdown } from '@/components/ui/dropdown'
import { DeleteIcon16, FaceSadIcon24, RetryIcon16 } from '@/components/ui/icons'

type PlaceFormInputPhotosPreviewErrorProps = {
    onDelete: () => void
    onRetry: () => void
}

export const PlaceFormInputPhotosPreviewError = ({ onDelete, onRetry }: PlaceFormInputPhotosPreviewErrorProps) => {
    return (
        <div className="flex-center relative aspect-square size-full rounded-lg border border-red-100 text-red-100">
            <div className="absolute right-1 top-1 h-8 w-8">
                <Dropdown
                    items={[
                        {
                            caption: 'Retry',
                            value: 'retry',
                            icon: <RetryIcon16 />,
                            onClick: onRetry,
                        },
                        {
                            caption: 'Delete',
                            value: 'delete',
                            icon: <DeleteIcon16 />,
                            isRed: true,
                            onClick: onDelete,
                        },
                    ]}
                />
            </div>
            <FaceSadIcon24 />
        </div>
    )
}
