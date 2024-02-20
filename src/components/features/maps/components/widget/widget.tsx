'use client'

import { useState } from 'react'

import type { IUserInfo } from '@/utils/types/user'

import { WidgetPlaces } from './widget-places'
import { WidgetRandom } from './widget-random'

type WidgetProps = {
    userInfo: IUserInfo | null
}

export const Widget = ({ userInfo }: WidgetProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false)

    const toggleFlip = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className="fixed right-0 top-0 z-40 sm:w-[512px]">
            {isFlipped ? (
                <WidgetRandom userInfo={userInfo} onFlip={toggleFlip} />
            ) : (
                <WidgetPlaces userInfo={userInfo} onFlip={toggleFlip} />
            )}
        </div>
    )
}
