import { LandingAroundPlaces } from './components/landing-around-places'
import { LandingCountries } from './components/landing-countries'
import { LandingFeatures } from './components/landing-features'
import { LandingHero } from './components/landing-hero'
import { LandingMaps } from './components/landing-maps'

export const Landing = () => {
    return (
        <div>
            <LandingHero />
            <div className="relative z-40 bg-white">
                <div className="container flex flex-col gap-y-24 py-24">
                    <LandingCountries />
                    <LandingAroundPlaces />
                    <LandingMaps />
                    <LandingFeatures />
                </div>
            </div>
        </div>
    )
}
