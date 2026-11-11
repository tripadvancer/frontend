import Image from 'next/image'

import { LandingFeaturesSharePlacesButtonWithAuth } from './landing-features-share-places-button-with-auth'

export const LandingFeaturesSharePlaces = async () => {
    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/landing-features-share-places.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Points of Interest"
            />
            <section className="flex flex-col gap-y-4 sm:gap-y-8">
                <h4 className="h5">
                    {
                        <>
                            Share hidden gems
                            <br />
                            with fellow travelers
                        </>
                    }
                </h4>
                <p>
                    {
                        'Add unique locations to the map and help other adventurers discover amazing places. With just a few clicks, your favorite spots become accessible to the entire travel community.'
                    }
                </p>
                <div className="flex-none">
                    <LandingFeaturesSharePlacesButtonWithAuth />
                </div>
            </section>
        </div>
    )
}
