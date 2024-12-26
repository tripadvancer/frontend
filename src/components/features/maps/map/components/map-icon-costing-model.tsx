import { CostingModel } from '@stadiamaps/api'
import { BikeIcon, CarFrontIcon } from 'lucide-react'

import Image from 'next/image'

type MapCostingModelIconProps = {
    costingModel: CostingModel
}

export const MapIconCostingModel = ({ costingModel }: MapCostingModelIconProps) => {
    const mappingCostingModelToIcon = {
        [CostingModel.Auto]: <CarFrontIcon size={16} />,
        [CostingModel.Bicycle]: <BikeIcon size={16} />,
        [CostingModel.Pedestrian]: <Image src="/images/ions/walk.svg" width={16} height={16} alt="" />,

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
