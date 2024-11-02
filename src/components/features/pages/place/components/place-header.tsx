import { GeoJsonPoint } from '@/utils/types/geo'

import { PlaceHeaderCategories } from './place-header-categories'
import { PlaceHeaderCoordinates } from './place-header-coordinates'
import { PlaceHeaderCountry } from './place-header-country'
import { PlaceHeaderCover } from './place-header-cover'
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
        <div className="flex-center relative z-10 -mb-8 flex-[540px] pb-8">
            <PlaceHeaderCover cover={cover} />
            <section className="container relative z-30 py-8">
                <div className="flex-center m-auto flex-col gap-y-4 sm:w-2/3">
                    <PlaceHeaderCountry countryCode={countryCode} />
                    <PlaceHeaderTitle title={title} />
                    <PlaceHeaderCoordinates location={location} />
                    <PlaceHeaderCategories categories={categories} />
                </div>
            </section>
        </div>
    )
}
