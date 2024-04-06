import { getCountries } from '@/services/countries'
import { getI18n } from '@/utils/i18n/i18n.server'

import { LandingCountries } from './components/landing-countries'
import { LandingFeatures } from './components/landing-features'
import { LandingMaps } from './components/landing-maps'
import { LandingUserCountry } from './components/landing-user-country'

export const Landing = async () => {
    const t = await getI18n()

    return (
        <div className="container flex flex-col gap-y-24 py-24">
            <LandingCountries />
            <LandingFeatures />
            <LandingMaps />
        </div>
    )
}
