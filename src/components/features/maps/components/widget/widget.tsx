'use client'

import { useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

import { animated, useSpring } from '@react-spring/web'
import classNames from 'classnames'

import type { IUserInfo } from '@/utils/types/user'

import { WidgetPlaces } from './widget-places'
import { WidgetRandom } from './widget-random'

type WidgetProps = {
    userInfo: IUserInfo | null
}

export const Widget = ({ userInfo }: WidgetProps) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)

    const { transform } = useSpring({
        transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
        config: { mass: 8, tension: 500, friction: 80 },
        onStart: () => setIsAnimating(true),
        onRest: () => setIsAnimating(false),
    })

    return (
        <div
            className={classNames('perspective fixed right-0 top-0 z-40 sm:w-[512px]', {
                'pointer-events-none h-[120%]': isAnimating,
            })}
        >
            <animated.div className="preserve-3d relative h-full" style={{ transform }}>
                <ScrollContainer
                    className={classNames('backface-hidden absolute top-0 max-h-screen w-full sm:p-8', {
                        'max-h-full': isAnimating,
                    })}
                >
                    <WidgetPlaces userInfo={userInfo} onFlip={() => setIsFlipped(!isFlipped)} />
                </ScrollContainer>

                <ScrollContainer
                    className={classNames('rotate-y-180 backface-hidden absolute top-0 max-h-screen w-full sm:p-8', {
                        'max-h-full': isAnimating,
                    })}
                >
                    <WidgetPlaces userInfo={userInfo} onFlip={() => setIsFlipped(!isFlipped)} />
                    {/* <WidgetRandom userInfo={userInfo} onFlip={() => setIsFlipped(!isFlipped)} /> */}
                </ScrollContainer>
            </animated.div>
        </div>
    )
}
