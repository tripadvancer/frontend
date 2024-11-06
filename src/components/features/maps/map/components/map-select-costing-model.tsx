'use client'

import { CostingModel } from '@stadiamaps/api'

import { BicycleIcon16, CarIcon16, WalkIcon16 } from '@/components/ui/icons'
import { MapDropdownControl } from '@/components/ui/map-dropdown-control'
import { getRouteCostingModel, setRouteCostingModel } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const MapSelectCostingModel = () => {
    const dispatch = useAppDispatch()
    const routeCostingModel = useAppSelector(getRouteCostingModel)

    return (
        <MapDropdownControl
            options={[
                { icon: <CarIcon16 />, value: CostingModel.Auto },
                { icon: <BicycleIcon16 />, value: CostingModel.Bicycle },
                { icon: <WalkIcon16 />, value: CostingModel.Pedestrian },
            ]}
            selectedValue={routeCostingModel}
            onChange={(value: CostingModel) => {
                dispatch(setRouteCostingModel(value))
            }}
        />
    )
}
