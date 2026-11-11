import { MapIcon } from 'lucide-react'

import Image from 'next/image'

import { CountriesGrid } from '@/components/features/common/countries-grid/countries-grid'
import { LinkButton } from '@/components/ui/link-button'
import { getCountries } from '@/services/countries'
import { getSettings } from '@/services/settings'

export const Countries = async () => {
    const countries = await getCountries()
    const settings = await getSettings()

    return (
        <section className="container space-y-16 py-16">
            <div className="space-y-4 sm:w-3/4">
                <h1 className="h1 max-w-full break-words">Explore Countries and Travel Destinations</h1>
                <p className="text-big text-black-70">
                    {settings.placesCount} places in {settings.countriesCount} countries
                </p>
            </div>

            <div className="space-y-4 sm:space-y-8">
                <div className="bg-orange-10 flex flex-col items-center gap-8 rounded-2xl p-8 text-center sm:flex-row sm:text-left">
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
