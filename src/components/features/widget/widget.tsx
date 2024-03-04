'use client'

import { useState } from 'react'

import { WidgetPlaces } from './widget-places'
import { WidgetRandom } from './widget-random'

export const Widget = () => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false)

    const toggleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className="fixed right-0 top-0 z-40 w-full sm:w-[512px]">
            {isFlipped ? <WidgetRandom onFlip={toggleFlip} /> : <WidgetPlaces onFlip={toggleFlip} />}
        </div>
    )
}
