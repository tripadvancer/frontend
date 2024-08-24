import type { IPlace } from '@/utils/types/place'

import { PlaceHeaderCategories } from './place-header-categories'
import { PlaceHeaderCoordinates } from './place-header-coordinates'
import { PlaceHeaderCountry } from './place-header-country'
import { PlaceHeaderCover } from './place-header-cover'
import { PlaceHeaderTitle } from './place-header-title'

export const PlaceHeader = (place: IPlace) => {
    return (
        <div className="flex-center relative z-10 -mb-8 flex-[540px] pb-8">
            <PlaceHeaderCover {...place} />
            <section className="container relative z-30 py-8">
                <div className="flex-center m-auto flex-col gap-y-4 sm:w-2/3">
                    <PlaceHeaderCountry {...place} />
                    <PlaceHeaderTitle {...place} />
                    <PlaceHeaderCoordinates {...place} />
                    <PlaceHeaderCategories {...place} />
                </div>
            </section>
        </div>
    )
}
