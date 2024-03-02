'use clisen'

import ReactSlider from 'react-slider'

export const WidgetRandomSlider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => {
    return (
        <ReactSlider
            min={10}
            max={1000}
            value={value}
            className="my-3 h-2"
            thumbClassName="example-thumb"
            renderTrack={(props: any) => <div {...props} className="h-full rounded bg-orange-10 odd:bg-orange-80" />}
            renderThumb={(props: any, state: any) => (
                <div
                    {...props}
                    className="flex-center trasform top-1 h-8 w-[70px] -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-black-5 bg-white text-small-bold shadow-small focus:outline-none"
                >
                    {state.valueNow} km
                </div>
            )}
            onChange={value => onChange(value)}
        />
    )
}
