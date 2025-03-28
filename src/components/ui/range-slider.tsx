'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useTranslations } from 'next-intl'

interface InputRangeProps {
    value: number
    min: number
    max: number
    step: number
    onChange: (value: number) => void
}

export const InputRange = ({ value, min, max, step, onChange }: InputRangeProps) => {
    const t = useTranslations()
    const trackRef = useRef<HTMLDivElement>(null)
    const thumbWidth = 70
    const [trackWidth, setTrackWidth] = useState(0)

    useEffect(() => {
        if (trackRef.current) {
            setTrackWidth(trackRef.current.offsetWidth)
        }
    }, [])

    const percent = ((value - min) / (max - min)) * 100
    const leftPosition = (percent / 100) * (trackWidth - thumbWidth)

    return (
        <div className="pointer-events-none relative flex w-full items-center">
            <div ref={trackRef} className="pointer-events-none relative h-2 w-full rounded bg-orange-10">
                <div
                    className="absolute left-0 top-0 h-full rounded bg-orange-80"
                    style={{ width: `${percent}%` }}
                ></div>
            </div>

            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="pointer-events-auto absolute left-0 z-10 w-full cursor-pointer opacity-0"
            />

            <div
                className="flex-center absolute top-1 h-8 w-[70px] -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-black-5 bg-white text-small-bold shadow-small"
                style={{ left: `${leftPosition}px` }}
            >
                {t('map.widget.random.distance.km', { distance: value })}
            </div>
        </div>
    )
}
