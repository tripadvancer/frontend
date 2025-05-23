import { ICountry } from '@/utils/types/country'

import { CountriesGridItem } from './countries-grid-item'

export const CountriesGrid = ({ countries }: { countries: ICountry[] }) => {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {countries.map(country => (
                <CountriesGridItem key={`countries-grid-item-${country.countryCode}`} {...country} />
            ))}
        </div>
    )
}
