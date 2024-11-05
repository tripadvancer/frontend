'use client'

import { ReactNode, useState } from 'react'

type MapDropdownControlOptions = {
    icon: ReactNode
    value: any
}

type MapDropdownControlProps = {
    options: MapDropdownControlOptions[]
    selectedValue: string
    onChange: (value: any) => void
}

export const MapDropdownControl = ({ options, selectedValue, onChange }: MapDropdownControlProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex rounded-lg bg-white shadow-black">
            <div
                className="flex-center hover-animated size-10 cursor-pointer hover:text-blue-active sm:size-8"
                onClick={() => setIsOpen(!isOpen)}
            >
                {options.find(option => option.value === selectedValue)?.icon}
            </div>

            {isOpen &&
                options.map(item => (
                    <div
                        key={`map-dropdown-control-${item.value}`}
                        className="flex-center hover-animated size-10 cursor-pointer hover:text-blue-active sm:size-8"
                        onClick={() => {
                            onChange(item.value)
                            setIsOpen(false)
                        }}
                    >
                        {item.icon}
                    </div>
                ))}
        </div>
    )
}
