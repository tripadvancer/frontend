'use client'

import { FormEvent } from 'react'

import { useI18n } from '@/utils/i18n/i18n.client'

type FormInputCoordinatesProps = {
    value: string
    onChange: (value: string | null) => void
}

export const FormInputCoordinates = ({ value, onChange }: FormInputCoordinatesProps) => {
    const t = useI18n()

    const handleInput = (e: FormEvent<HTMLDivElement>) => {
        const value = e.currentTarget.textContent
        onChange(value)
    }

    return (
        <div
            // type="text"
            contentEditable="true"
            // name="location"
            // autoComplete="off"
            // value={value}
            // placeholder="Enter coordinates of the place"
            className="text-big text-white placeholder:text-white focus:outline-none"
            onInput={handleInput}
        >
            {/* Enter coordinates of the place
             */}
            {value}
        </div>
    )
}
