import { MapPinnedIcon } from 'lucide-react'

import { HeaderSearchItem } from './header-search-item'

type HeaderSearchNearbyProps = {
    hideResults: () => void
}

export const HeaderSearchNearby = ({ hideResults }: HeaderSearchNearbyProps) => {
    return (
        <HeaderSearchItem
            title="Places Nearby"
            info="See places near your location"
            icon={<MapPinnedIcon size={16} />}
            href="/maps?nearby_only=true"
            hideResults={hideResults}
        />
    )
}
