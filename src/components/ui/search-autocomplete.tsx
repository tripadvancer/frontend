'use client'

import { Ref, forwardRef, memo, useEffect, useState } from 'react'

import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

import { SearchAutocompleteItem } from './search-autocomplete-item'

type SearchAutocompleteProps = {
    items: ISearchItem<IPlacePreview | ILocationPreview>[]
    onSelect: (item: ISearchItem<IPlacePreview | ILocationPreview>) => void
}

export const SearchAutocomplete = forwardRef(function SearchAutocomplete(
    { items, onSelect }: SearchAutocompleteProps,
    ref: Ref<HTMLDivElement>,
) {
    const [cursor, setCursor] = useState<number>(0)

    useKeypress(Keys.ENTER, () => {
        if (items.length > 0) {
            handleSelect(items[cursor])
        }
    })

    useKeypress(Keys.UP, () => {
        if (items.length > 0) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : items.length - 1))
        }
    })

    useKeypress(Keys.DOWN, () => {
        if (items.length > 0) {
            setCursor(prevState => (prevState < items.length - 1 ? prevState + 1 : 0))
        }
    })

    const handleSelect = (item: ISearchItem<IPlacePreview | ILocationPreview>) => {
        onSelect(item)
    }

    return (
        <div ref={ref} className="absolute left-0 right-0 top-full z-40 rounded-lg bg-white p-1 shadow-small">
            {items.map((item, index) => (
                <SearchAutocompleteItem
                    key={`search-result-item-${index}`}
                    item={item}
                    isSelected={index === cursor}
                    onMouseEnter={() => setCursor(index)}
                    onClick={handleSelect}
                />
            ))}
        </div>
    )
})
