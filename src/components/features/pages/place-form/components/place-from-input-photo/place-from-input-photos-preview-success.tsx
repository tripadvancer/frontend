import { CheckIcon, CopyrightIcon, TrashIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Dropdown } from '@/components/ui/dropdown'
import { Photo } from '@/components/ui/photo'

type PlaceFormInputPhotosPreviewSuccessProps = {
    url: string
    isCover: boolean
    onClick: () => void
    onAddAttribute: () => void
    onSetAsCover: () => void
    onDelete: () => void
}

export const PlaceFormInputPhotosPreviewSuccess = ({
    url,
    isCover,
    onClick,
    onAddAttribute,
    onSetAsCover,
    onDelete,
}: PlaceFormInputPhotosPreviewSuccessProps) => {
    const t = useTranslations()

    return (
        <div className="relative">
            {isCover && (
                <div className="absolute left-1 top-1 rounded-lg bg-black-100 px-2 py-0.5 text-small-bold text-white">
                    {t('page.placeForm.field.photos.cover')}
                </div>
            )}
            <div className="absolute right-1 top-1 h-8 w-8">
                <Dropdown
                    items={[
                        {
                            caption: 'Add a photo attribute',
                            value: 'add-photo-attribute',
                            icon: <CopyrightIcon size={16} />,
                            onClick: onAddAttribute,
                        },
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
