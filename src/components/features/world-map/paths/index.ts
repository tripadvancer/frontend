import type { SVGPath } from '@/utils/types/common'

import { US } from './us'
import { world } from './world'

type Data = {
    [key: string]: SVGPath[]
}

export const data: Data = {
    WORLD: world,
    US: US,
}
