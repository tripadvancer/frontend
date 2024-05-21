'use client'

import ReactSlider from 'react-slider'

import { getWidgetRandomRadius, setWidgetRandomRadius } from '@/redux/features/widget-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useI18n } from '@/utils/i18n/i18n.client'

export const WidgetRandomSlider = () => {
    const t = useI18n()
    const dispatch = useAppDispatch()
    const radius = useAppSelector(getWidgetRandomRadius)

    return (
        <ReactSlider
            min={1}
            max={100}
            step={1}
            value={radius}
            className="my-3 h-2"
            renderTrack={props => (
                <div
                    {...props}
                    key={`slider-track-${props.key}`}
                    className="h-full rounded bg-orange-10 odd:bg-orange-80"
                />
            )}
            renderThumb={(props, state) => (
                <div
                    {...props}
                    key="slider-thumb"
                    className="trasform flex-center top-1 h-8 w-[70px] -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-black-5 bg-white text-small-bold shadow-small focus:outline-none"
                >
                    {t('widget.random.distance', { distance: state.valueNow })}
                </div>
            )}
            onChange={value => dispatch(setWidgetRandomRadius(value))}
        />
    )
}
