'use client'

import { CostingModel } from '@stadiamaps/api'

import { BicycleIcon16, CarIcon16, WalkIcon16 } from '@/components/ui/icons'
import { MapDropdownControl } from '@/components/ui/map-dropdown-control'
import { getRouteCostingModel, setRouteCostingModel } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useMapRoute } from '@/utils/hooks/use-map-route'

export const MapSelectCostingModel = () => {
    const dispatch = useAppDispatch()
    const routeCostingModel = useAppSelector(getRouteCostingModel)

    const { clearRoute } = useMapRoute()

    return (
        <MapDropdownControl
            options={[
                { value: CostingModel.Auto },
                { value: CostingModel.Bicycle },
                { value: CostingModel.Pedestrian },
            ]}
            selectedValue={routeCostingModel}
            onChange={(value: CostingModel) => {
                dispatch(setRouteCostingModel(value))
                clearRoute()
            }}
        />
    )
}
