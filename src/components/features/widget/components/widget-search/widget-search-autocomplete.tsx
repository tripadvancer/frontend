'use client'

import { CSSProperties, forwardRef, useState } from 'react'

import type { ILocationPreview, IPlacePreview } from '@/utils/types/place'
import type { ISearchItem } from '@/utils/types/search'

import { Keys } from '@/utils/enums'
import { useKeypress } from '@/utils/hooks/use-keypress'

import { WidgetSearchAutocompleteItem } from './widget-search-autocomplete-item'

type WidgetSearchAutocompleteProps = {
    style: CSSProperties
    suggestions: ISearchItem<IPlacePreview | ILocationPreview>[]
    onSelect: (cursor: number) => void
}

const WidgetSearchAutocomplete = forwardRef<HTMLDivElement, WidgetSearchAutocompleteProps>(
    function WidgetSearchAutocomplete({ style, suggestions, onSelect }, ref) {
        const [cursor, setCursor] = useState<number>(0)

        useKeypress(Keys.ENTER, () => {
            if (suggestions.length > 0) {
                onSelect(cursor)
            }
        })

        useKeypress(Keys.UP, () => {
            if (suggestions.length > 0) {
                setCursor(prevState => (prevState > 0 ? prevState - 1 : suggestions.length - 1))
            }
        })

        useKeypress(Keys.DOWN, () => {
            if (suggestions.length > 0) {
                setCursor(prevState => (prevState < suggestions.length - 1 ? prevState + 1 : 0))
            }
        })

        return (
            <div ref={ref} className="fixed z-40 rounded-lg bg-white p-1 shadow-small" style={style}>
                {suggestions.map((suggestion, index) => (
                    <WidgetSearchAutocompleteItem
                        key={`search-result-item-${index}`}
                        item={suggestion}
                        isSelected={index === cursor}
                        onMouseEnter={() => setCursor(index)}
                        onClick={() => onSelect(index)}
                    />
                ))}
            </div>
        )
    },
)

WidgetSearchAutocomplete.displayName = 'WidgetSearchAutocomplete'

export { WidgetSearchAutocomplete }
