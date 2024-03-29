import classNames from 'classnames'

import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { PinIcon16, PointIcon16 } from '@/components/ui/icons'

type WidgetSearchAutocompleteItemProps = {
    item: ISearchItem<IPlacePreview | ILocationPreview>
    isSelected: boolean
    onMouseEnter: () => void
    onClick: () => void
}

export const WidgetSearchAutocompleteItem = ({
    item,
    isSelected,
    onMouseEnter,
    onClick,
}: WidgetSearchAutocompleteItemProps) => {
    return (
        <div
            className={classNames('hover-animated group relative cursor-pointer rounded-md', {
                ['bg-black-5']: isSelected,
            })}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            <div className="flex gap-x-2 px-3 py-2">
                <div className="mt-[3px] text-black-40">
                    {item.type === 'place' && <PinIcon16 />}
                    {item.type === 'location' && <PointIcon16 />}
                </div>
                <div className="overflow-hidden">
                    <div className="hover-animated line-clamp-2 break-words group-hover:text-blue-active">
                        {item.title}
                    </div>
                    <div className="line-clamp-2 break-words text-small text-black-40">{item.info}</div>
                </div>
            </div>
        </div>
    )
}
