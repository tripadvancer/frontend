import type { ICountry } from '@/utils/types/country'

import { FeedCountriesItem } from './feed-countries-item'

export const FeedCountries = ({ countries }: { countries: ICountry[] }) => {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {countries.map((country, index) => (
                <FeedCountriesItem key={index} {...country} />
            ))}
        </div>
    )
}
