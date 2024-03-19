'use client'

import { useState } from 'react'

import { animated, useSpring } from '@react-spring/web'
import classNames from 'classnames'

import { getWidgetState, setWidgetSide } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { WidgetSide } from '@/utils/enums'

import { WidgetPlaces } from './widget-places'
import { WidgetRandom } from './widget-random'

export const Widget = () => {
    const dispatch = useAppDispatch()
    const widgetState = useAppSelector(getWidgetState)

    const [isAnimating, setIsAnimating] = useState<boolean>(false)

    const { transform } = useSpring({
        transform: `rotateY(${widgetState.widgetSide === WidgetSide.RANDOM ? 180 : 0}deg)`,
        config: { mass: 8, tension: 500, friction: 80 },
        onStart: () => {
            setIsAnimating(true)
        },
        onRest: () => {
            setIsAnimating(false)
        },
    })

    return (
        <div
            className={classNames(
                'pointer-events-none fixed bottom-0 right-0 top-0 z-40 w-full [perspective:1000px] sm:w-[512px]',
                {
                    '!-bottom-32 !-top-32': isAnimating,
                },
            )}
        >
            <animated.div className="relative box-border h-full [transform-style:preserve-3d]" style={{ transform }}>
                <WidgetPlaces
                    className={classNames('absolute right-0 top-0 z-10 pb-8 [backface-visibility:hidden] sm:py-8', {
                        '!py-32 sm:!py-40': isAnimating,
                    })}
                    onFlip={() => dispatch(setWidgetSide(WidgetSide.RANDOM))}
                />
                <WidgetRandom
                    className={classNames(
                        'absolute right-0 top-0 z-20 pb-8 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:py-8',
                        {
                            '!py-32 sm:!py-40': isAnimating,
                        },
                    )}
                    onFlip={() => dispatch(setWidgetSide(WidgetSide.PLACES))}
                />
            </animated.div>
        </div>
    )
}
