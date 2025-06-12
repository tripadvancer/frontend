import { MapPinnedIcon } from 'lucide-react'

import { HeaderSearchItem } from './header-search-item'

export const HeaderSearchNearby = () => {
    return (
        <HeaderSearchItem
            title="Places Nearby"
            info="See places near your location"
            icon={<MapPinnedIcon size={16} />}
            href="/maps?nearby_only=true"
        />
    )
}
