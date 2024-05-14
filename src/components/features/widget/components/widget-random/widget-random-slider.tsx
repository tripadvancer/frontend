'use client'

import ReactSlider from 'react-slider'

type WidgetRandomSliderProps = {
    value: number
    onChange: (value: number) => void
}

export const WidgetRandomSlider = ({ value, onChange }: WidgetRandomSliderProps) => {
    return (
        <ReactSlider
            min={1}
            max={100}
            step={1}
            value={value}
            className="my-3 h-2"
            renderTrack={WidgetRandomSliderTrack}
            renderThumb={WidgetRandomSliderThumb}
            onChange={value => onChange(value)}
        />
    )
}

const WidgetRandomSliderTrack = (props: any) => {
    return <div {...props} className="h-full rounded bg-orange-10 odd:bg-orange-80" />
}

const WidgetRandomSliderThumb = (props: any, state: any) => {
    return (
        <div
            {...props}
            className="trasform flex-center top-1 h-8 w-[70px] -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-black-5 bg-white text-small-bold shadow-small focus:outline-none"
        >
            {state.valueNow} km
        </div>
    )
}
