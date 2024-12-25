import classNames from 'classnames'
import { GlobeIcon, LocateFixedIcon, MapPinIcon } from 'lucide-react'

import { ICountryDict } from '@/utils/types/country'
import { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import { ISearchItem } from '@/utils/types/search'

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
                    {item.type === 'country' && <GlobeIcon size={16} />}
                    {item.type === 'place' && <MapPinIcon size={16} />}
                    {item.type === 'location' && <LocateFixedIcon size={16} />}
                </div>
                <div className="overflow-hidden">
                    <div className="line-clamp-2 break-words group-hover:text-blue-active">{item.title}</div>
                    <div className="line-clamp-2 break-words text-small text-black-40">{item.info}</div>
                </div>
            </div>
        </div>
    )
}
