import { LinkButton } from '@/components/ui/link-button'

import { LandingHeroBg } from './landing-hero-bg'
import { LandingJoinButtonWithAuth } from './landing-hero-join-button-with-auth'

export const LandingHero = () => {
    return (
        <div className="relative h-[700px] bg-blue-80 pb-7">
            <LandingHeroBg />

            <div className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2 transform">
                <h1 className="h1 mb-4 text-white">
                    Share your favorite spots
                    <br />
                    and track visited countries
                </h1>
                <p className="mb-8 text-big text-white">
                    Join the community of travelers and share your favorite places with others.
                    <br />
                    Track the countries you have visited and plan your next trip.
                </p>
                <div className="flex items-center gap-x-4">
                    <LandingJoinButtonWithAuth />
                    <LinkButton href="#features" variant="white">
                        Learn More
                    </LinkButton>
                </div>
            </div>
        </div>
    )
}
