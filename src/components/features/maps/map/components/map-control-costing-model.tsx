'use client'

import { useState } from 'react'

import { CostingModel } from '@stadiamaps/api'

import { getRouteCostingModel, setRouteCostingModel } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useMapRoute } from '@/utils/hooks/use-map-route'

import { MapIconCostingModel } from './map-icon-costing-model'

export const MapControlCostingModel = () => {
    const dispatch = useAppDispatch()
    const routeCostingModel = useAppSelector(getRouteCostingModel)

    const [isOpen, setIsOpen] = useState(false)

    const { clearRoute } = useMapRoute()

    const filteredOptions = [
        { value: CostingModel.Auto },
        { value: CostingModel.Bicycle },
        { value: CostingModel.Pedestrian },
    ].filter(option => option.value !== routeCostingModel)

    return (
        <div className="flex flex-row-reverse rounded-lg bg-white shadow-black sm:flex-row">
            <div
                className="flex-center hover-animated size-10 cursor-pointer hover:text-blue-active sm:size-8"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MapIconCostingModel costingModel={routeCostingModel} />
            </div>

            {isOpen &&
                filteredOptions.map(item => (
                    <div
                        key={`costing-model-${item.value}`}
                        className="flex-center hover-animated size-10 cursor-pointer hover:text-blue-active sm:size-8"
                        onClick={() => {
                            dispatch(setRouteCostingModel(item.value))
                            clearRoute()
                            setIsOpen(false)
                        }}
                    >
                        <MapIconCostingModel costingModel={item.value} />
                    </div>
                ))}
        </div>
    )
}
