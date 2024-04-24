import { LandingAroundPlace } from './components/landing-around-place'
import { LandingCountries } from './components/landing-countries'
import { LandingFeatures } from './components/landing-features'
import { LandingMaps } from './components/landing-maps'

export const Landing = () => {
    return (
        <div className="container flex flex-col gap-y-24 py-24">
            <LandingCountries />
            <LandingAroundPlace />
            <LandingFeatures />
            <LandingMaps />
        </div>
    )
}
