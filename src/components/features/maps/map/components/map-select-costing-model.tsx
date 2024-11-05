'use client'

import { CostingModel } from '@stadiamaps/api'

import { MapDropdownControl } from '@/components/ui/map-dropdown-control'
import { getRouteCostingModel, setRouteCostingModel } from '@/redux/features/map-slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const MapSelectCostingModel = () => {
    const dispatch = useAppDispatch()
    const routeCostingModel = useAppSelector(getRouteCostingModel)

    return (
        <MapDropdownControl
            options={[
                { icon: 'auto', value: CostingModel.Auto },
                { icon: 'bike', value: CostingModel.Bicycle },
                { icon: 'walk', value: CostingModel.Pedestrian },
            ]}
            selectedValue={routeCostingModel}
            onChange={(value: CostingModel) => {
                dispatch(setRouteCostingModel(value))
            }}
        />
    )
}
