import { MapIcon } from 'lucide-react'

import Image from 'next/image'

import { CountriesGrid } from '@/components/features/common/countries-grid/countries-grid'
import { LinkButton } from '@/components/ui/link-button'
import { getCountries } from '@/services/countries'
import { getCountryByCode } from '@/utils/helpers/countries'

export const Countries = async () => {
    const countries = (await getCountries()).sort((first, second) => {
        const firstName = getCountryByCode(first.countryCode)?.name ?? first.countryCode
        const secondName = getCountryByCode(second.countryCode)?.name ?? second.countryCode

        return firstName.localeCompare(secondName, 'en')
    })

    return (
        <section className="container space-y-16 py-24">
            <h1 className="h1 mb-4 text-center">Where are you going?</h1>
            <p className="text-big text-black-70 m-auto mb-16 w-full text-center sm:w-2/3">
                Visit top-rated destinations recommended by fellow travelers. Discover must-see sights, from iconic
                landmarks to hidden gems waiting to be explored.
            </p>

            <div className="space-y-4 sm:space-y-8">
                <div className="flex flex-col items-center gap-8 rounded-2xl bg-orange-10 p-8 text-center sm:flex-row sm:text-left">
                    <Image
                        src="/images/mini-map.png"
                        width={162}
                        height={56}
                        className="shrink-0"
                        alt="Tripadvancer Map"
                    />
                    <div className="flex-1">
                        <h2 className="h5">View places on the map</h2>
                        <p className="text-big text-black-70">
                            Discover places around the world with our interactive map.
                        </p>
                    </div>
                    <LinkButton href="/maps" variant="orange" className="flex shrink-0 items-center gap-x-2">
                        <MapIcon />
                        View Map
                    </LinkButton>
                </div>

                <CountriesGrid countries={countries} />
            </div>
        </section>
    )
}
