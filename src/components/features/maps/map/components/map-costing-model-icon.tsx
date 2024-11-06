import { CostingModel } from '@stadiamaps/api'

import { BicycleIcon16, CarIcon16, WalkIcon16 } from '@/components/ui/icons'

export const MapCostingModelIcon = ({ costingModel }: { costingModel: CostingModel }) => {
    const mappingCostingModelToIcon = {
        [CostingModel.Auto]: <CarIcon16 />,
        [CostingModel.Bicycle]: <BicycleIcon16 />,
        [CostingModel.Pedestrian]: <WalkIcon16 />,
    }

    return mappingCostingModelToIcon[costingModel]
}
