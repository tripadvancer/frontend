'use client'

import { ClassAttributes, HTMLAttributes, JSX } from 'react'

import { useTranslations } from 'next-intl'

import { ReactSlider } from '@/components/vendor/react-slider/react-slider'
import { getWidgetRandomRadius, setWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const WidgetRandomSlider = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const radius = useAppSelector(getWidgetRandomRadius)

    return (
        <ReactSlider
            min={1}
            max={100}
            step={1}
            value={radius}
            className="my-3 h-2"
            renderTrack={(
                props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>,
            ) => (
                <div
                    {...props}
                    key={`slider-track-${props.key}`}
                    className="h-full rounded bg-orange-10 odd:bg-orange-80"
                />
            )}
            renderThumb={(
                props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>,
                state: { valueNow: any },
            ) => (
                <div
                    {...props}
                    key="slider-thumb"
                    className="trasform flex-center top-1 h-8 w-[70px] -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-black-5 bg-white text-small-bold shadow-small focus:outline-none"
                >
                    {t('map.widget.random.distance.km', { distance: state.valueNow })}
                </div>
            )}
            onChange={(value: number) => dispatch(setWidgetRandomRadius(value))}
        />
    )
}
