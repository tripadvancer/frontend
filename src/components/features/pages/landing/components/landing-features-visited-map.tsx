import Image from 'next/image'

import { LandingFeaturesVisitedMapButtonWithAuth } from './landing-features-visited-map-button-with-auth'

export const LandingFeaturesVisitedMap = async () => {
    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/landing-features-visited-map.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Random places around me"
            />
            <section className="flex flex-col gap-y-4 sm:-order-1 sm:gap-y-8 sm:text-right">
                <h4 className="h5">
                    {
                        <>
                            Visited countries map
                            <br />
                            to track your adventures
                        </>
                    }
                </h4>
                <p>
                    {
                        'Mark the countries you’ve explored and watch your personalized map come to life. Showcase your travel history and motivate others to start their journeys.'
                    }
                </p>
                <div className="flex-none">
                    <LandingFeaturesVisitedMapButtonWithAuth />
                </div>
            </section>
        </div>
    )
}
