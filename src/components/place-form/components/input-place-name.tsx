'use client'

import { FormEvent, useState } from 'react'

import { useI18n } from '@/utils/i18n/i18n.client'

type InputPlaceNameProps = {
    value: string
    onChange: (value: string | null) => void
}

export const InputPlaceName = ({ value, onChange }: InputPlaceNameProps) => {
    const t = useI18n()

    const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true)

    const placeholder = 'Place name'

    const handleInput = (e: FormEvent<HTMLDivElement>) => {
        const value = e.currentTarget.textContent
        onChange(value)
    }

    return (
        <div
        // contentEditable="true"
        // className="text-h1-m text-white placeholder:text-white focus:outline-none sm:text-h1"
        // onClick={() => setShowPlaceholder(false)}
        // onBlur={() => setShowPlaceholder(true)}
        // onInput={handleInput}
        >
            {showPlaceholder ? placeholder : value}
        </div>
    )
}
