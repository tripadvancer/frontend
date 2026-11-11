'use client'

import { ClassAttributes, HTMLAttributes, JSX } from 'react'

import { ReactSlider } from '@/components/vendor/react-slider/react-slider'
import { getWidgetRandomRadius, setWidgetRandomRadius } from '@/utils/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/utils/redux/hooks'

export const WidgetRandomSlider = () => {
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
                    key={`slider-track-${String(props.key)}`}
                    className="bg-orange-10 odd:bg-orange-80 h-full rounded"
                />
            )}
            renderThumb={(
                props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>,
                state: { valueNow: any },
            ) => (
                <div
                    {...props}
                    key="slider-thumb"
                    className="trasform flex-center border-black-5 text-small-bold shadow-small top-1 h-8 w-17.5 -translate-y-1/2 rounded-full border-2 bg-white whitespace-nowrap focus:outline-none"
                >
                    {state.valueNow} km
                </div>
            )}
            onChange={(value: number) => dispatch(setWidgetRandomRadius(value))}
        />
    )
}
