import { CountriesGrid } from '@/components/features/common/countries-grid/countries-grid'
import { ShowAllLink } from '@/components/ui/show-all-link'
import { getCountries } from '@/services/countries'
import { CountriesSortBy, OrderDirection } from '@/utils/enums'

export const LandingCountries = async () => {
    const countries = await getCountries(CountriesSortBy.POPULARITY, OrderDirection.DESC)

    return (
        <section>
            <h2 className="h1 mb-4 text-center">{'Where are you going?'}</h2>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                {
                    'Visit top-rated destinations recommended by fellow travelers. Discover must-see sights, from iconic landmarks to hidden gems waiting to be explored.'
                }
            </p>
            <div className="flex flex-col gap-y-8">
                <CountriesGrid countries={countries.slice(0, 8)} />
                <ShowAllLink href="/countries">{'Explore the World'}</ShowAllLink>
            </div>
        </section>
    )
}
