import classNames from 'classnames'

import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { PinIcon16 } from '@/components/ui/icons'
import { PlacePreviewCover } from '@/components/ui/place-preview-cover'

type WidgetSearchAautocompleteProps = {
    item: ISearchItem<IPlacePreview | ILocationPreview>
    isSelected: boolean
    onMouseEnter: () => void
    onClick: () => void
}

export const WidgetSearchAautocomplete = ({
    item,
    isSelected,
    onMouseEnter,
    onClick,
}: WidgetSearchAautocompleteProps) => {
    return (
        <div
            className={classNames('hover-animated group relative cursor-pointer rounded-md', {
                ['bg-black-5']: isSelected,
            })}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {item.type === 'place' && (
                <div className="flex items-center gap-x-2 px-3 py-2">
                    <div className="rounded-full">
                        <PlacePreviewCover size={24} isRounded {...(item.properties as IPlacePreview)} />
                    </div>
                    <div className="hover-animated line-clamp-2 break-words group-hover:text-blue-active">
                        {item.title}
                    </div>
                </div>
            )}

            {item.type === 'location' && (
                <div className="flex gap-x-2 px-3 py-2">
                    <div className="mt-[3px] text-black-40">
                        <PinIcon16 />
                    </div>
                    <div className="overflow-hidden">
                        <div className="hover-animated line-clamp-2 break-words group-hover:text-blue-active">
                            {item.title}
                        </div>
                        <div className="line-clamp-2 break-words text-small text-black-40">{item.info}</div>
                    </div>
                </div>
            )}
        </div>
    )
}
