import { getPlaceById } from '@/services/places'

import { Categories } from './categories'
import { CoordinatesToCopy } from './coordinates-to-copy'
import { Country } from './country'
import { Cover } from './cover'

export const Header = async ({ params }: { params: { locale: string; id: string } }) => {
    const place = await getPlaceById(params.id, undefined)

    return (
        <div className="flex-center relative z-10 -mb-8 flex-[540px] pb-8">
            <Cover {...place} />
            <section className="container relative z-30 py-8">
                <div className="flex-center m-auto flex-col gap-y-4 sm:w-2/3">
                    <Country {...place} locale={params.locale} />
                    <h1 className="text-center text-h1-m text-white sm:text-h1">{place.title}</h1>
                    <CoordinatesToCopy {...place} />
                    <Categories {...place} locale={params.locale} />
                </div>
            </section>
        </div>
    )
}
