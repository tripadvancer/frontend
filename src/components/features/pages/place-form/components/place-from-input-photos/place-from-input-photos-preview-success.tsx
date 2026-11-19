import { CheckIcon, TrashIcon } from 'lucide-react'

import { Dropdown } from '@/components/ui/dropdown'
import { Photo } from '@/components/ui/photo'

type PlaceFormInputPhotosPreviewSuccessProps = {
    url: string
    isCover: boolean
    onClick: () => void
    onDelete: () => void
    onSetAsCover: () => void
}

export const PlaceFormInputPhotosPreviewSuccess = ({
    url,
    isCover,
    onClick,
    onDelete,
    onSetAsCover,
}: PlaceFormInputPhotosPreviewSuccessProps) => {
    return (
        <div className="relative">
            {isCover && (
                <div className="bg-black-100 text-small-bold absolute top-1 left-1 rounded-2xl px-2 py-0.5 text-white">
                    Cover
                </div>
            )}
            <div className="absolute top-1 right-1 h-8 w-8">
                <Dropdown
                    items={[
                        {
                            caption: 'Set as cover',
                            value: 'set-as-cover',
                            icon: <CheckIcon size={16} />,
                            onClick: onSetAsCover,
                        },
                        {
                            caption: 'Delete',
                            value: 'delete',
                            icon: <TrashIcon size={16} />,
                            isRed: true,
                            onClick: onDelete,
                        },
                    ]}
                />
            </div>

            <Photo url={url} size={186} alt="" onClick={onClick} />
        </div>
    )
}
