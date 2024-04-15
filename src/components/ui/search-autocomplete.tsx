'use client'

import { memo, useEffect, useState } from 'react'

import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

import { SearchAutocompleteItem } from './search-autocomplete-item'

type SearchAutocompleteProps = {
    items: ISearchItem<IPlacePreview | ILocationPreview>[]
    onSelect: (item: ISearchItem<IPlacePreview | ILocationPreview>) => void
}

export const SearchAutocomplete = ({ items, onSelect }: SearchAutocompleteProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [cursor, setCursor] = useState<number>(0)

    useEffect(() => {
        console.log(items)
        setIsVisible(items.length > 0)
    }, [items])

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
        setIsVisible(false)
    }

    if (!isVisible) {
        return null
    }

    return (
        <div className="absolute left-0 right-0 top-full z-40 rounded-lg bg-white p-1 shadow-small">
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
}
