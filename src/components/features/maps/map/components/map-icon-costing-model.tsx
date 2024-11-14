import { CostingModel } from '@stadiamaps/api'

import { BicycleIcon16, CarIcon16, WalkIcon16 } from '@/components/ui/icons'

type MapCostingModelIconProps = {
    costingModel: CostingModel
}

export const MapIconCostingModel = ({ costingModel }: MapCostingModelIconProps) => {
    const mappingCostingModelToIcon = {
        [CostingModel.Auto]: <CarIcon16 />,
        [CostingModel.Bicycle]: <BicycleIcon16 />,
        [CostingModel.Pedestrian]: <WalkIcon16 />,

        [CostingModel.Bikeshare]: '',
        [CostingModel.Bus]: '',
        [CostingModel.LowSpeedVehicle]: '',
        [CostingModel.MotorScooter]: '',
        [CostingModel.Motorcycle]: '',
        [CostingModel.Taxi]: '',
        [CostingModel.Truck]: '',
    }

    return mappingCostingModelToIcon[costingModel]
}
