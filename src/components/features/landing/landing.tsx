import { LandingCountries } from './components/landing-countries'
import { LandingFeatures } from './components/landing-features'
import { LandingMaps } from './components/landing-maps'
import { LandingNearbyPlaces } from './components/landing-nearby-places'

export const Landing = () => {
    return (
        <div className="container flex flex-col gap-y-24 py-24">
            <LandingCountries />
            <LandingNearbyPlaces />
            <LandingFeatures />
            <LandingMaps />
        </div>
    )
}
