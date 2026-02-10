import { MapPinnedIcon } from 'lucide-react'

import { SearchItem } from './search-item'

type SearchNearbyProps = {
    hideResults: () => void
}

export const SearchNearby = ({ hideResults }: SearchNearbyProps) => {
    return (
        <SearchItem
            title="Places Nearby"
            info="See places near your location"
            icon={<MapPinnedIcon size={16} />}
            href="/maps?nearby_only=true"
            hideResults={hideResults}
        />
    )
}
