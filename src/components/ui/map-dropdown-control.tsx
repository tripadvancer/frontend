'use client'

import { useState } from 'react'

import { CostingModel } from '@stadiamaps/api'

import { MapCostingModelIcon } from '../features/maps/map/components/map-costing-model-icon'

type MapDropdownControlOptions = {
    value: any
}

type MapDropdownControlProps = {
    options: MapDropdownControlOptions[]
    selectedValue: CostingModel
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
                <MapCostingModelIcon costingModel={selectedValue} />
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
                        <MapCostingModelIcon costingModel={item.value} />
                    </div>
                ))}
        </div>
    )
}
