import { GeoJsonPoint } from '@/utils/types/geo'

import { PlaceHeaderCategories } from './place-header-categories'
import { PlaceHeaderCoordinates } from './place-header-coordinates'
import { PlaceHeaderCountry } from './place-header-country'
import { PlaceHeaderTitle } from './place-header-title'

type PlaceHeaderProps = {
    title: string
    cover: string | null
    categories: number[]
    countryCode: string | null
    location: GeoJsonPoint
}

export const PlaceHeader = ({ title, cover, categories, countryCode, location }: PlaceHeaderProps) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <PlaceHeaderCountry countryCode={countryCode} />
                <PlaceHeaderTitle title={title} />
                <PlaceHeaderCoordinates location={location} />
            </div>

            <PlaceHeaderCategories countryCode={countryCode} categories={categories} />
        </div>
    )
}
