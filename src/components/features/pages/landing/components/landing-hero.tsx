import Image from 'next/image'

import { LinkButton } from '@/components/ui/link-button'

import { LandingHeroBg } from './landing-hero-bg'
import { LandingJoinButtonWithAuth } from './landing-hero-join-button-with-auth'

export const LandingHero = async () => {
    return (
        <div className="bg-blue-80 relative flex flex-col justify-center pb-7 lg:h-[700px]">
            <LandingHeroBg />

            <div className="m-auto flex flex-col gap-y-8 px-4 py-16 text-center sm:w-[608px] lg:absolute lg:top-1/2 lg:left-16 lg:w-[600px] lg:-translate-y-1/2 lg:transform lg:px-0 lg:py-0 lg:text-left xl:left-1/2 xl:-translate-x-full">
                <div>
                    <h1 className="h1 mb-4 text-white">Discover places to visit and plan your next trip</h1>
                    <p className="text-big text-white">
                        Explore traveler-recommended attractions and hidden gems around the world. Save your favorite
                        places to trip lists, read reviews, and track the countries you have visited.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-x-4 lg:justify-start">
                    <LandingJoinButtonWithAuth />
                    <LinkButton href="#features" variant="white">
                        Learn More
                    </LinkButton>
                </div>
                <Image
                    src="/images/landing-hero-bg-phone.svg"
                    width={288}
                    height={186}
                    className="m-auto block lg:hidden"
                    alt="Tripadvancer"
                />
            </div>
        </div>
    )
}
