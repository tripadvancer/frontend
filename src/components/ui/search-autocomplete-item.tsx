import classNames from 'classnames'

import type { ICountryDict } from '@/utils/types/country'
import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { GlobeIcon16, PinIcon16, PointIcon16 } from '@/components/ui/icons'

type SearchAutocompleteItemProps = {
    item: ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>
    isSelected: boolean
    onMouseEnter: () => void
    onClick: (item: ISearchItem<IPlacePreview | ILocationPreview | ICountryDict>) => void
}

export const SearchAutocompleteItem = ({ item, isSelected, onMouseEnter, onClick }: SearchAutocompleteItemProps) => {
    return (
        <div
            className={classNames('group relative cursor-pointer rounded-md', { ['bg-black-5']: isSelected })}
            onClick={() => onClick(item)}
            onMouseEnter={onMouseEnter}
        >
            <div className="flex gap-x-2 px-3 py-2">
                <div className="mt-[3px] text-black-40">
                    {item.type === 'country' && <GlobeIcon16 />}
                    {item.type === 'place' && <PinIcon16 />}
                    {item.type === 'location' && <PointIcon16 />}
                </div>
                <div className="overflow-hidden">
                    <div className="line-clamp-2 break-words group-hover:text-blue-active">{item.title}</div>
                    <div className="line-clamp-2 break-words text-small text-black-40">{item.info}</div>
                </div>
            </div>
        </div>
    )
}
