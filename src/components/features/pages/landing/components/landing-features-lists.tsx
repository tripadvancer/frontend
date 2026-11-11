import Image from 'next/image'

import { LandingFeaturesListsButton } from './landing-features-lists-buttons'

export const LandingFeaturesLists = async () => {
    return (
        <div className="grid items-center gap-y-8 sm:grid-cols-2 sm:gap-x-16">
            <Image
                src="/images/landing-features-lists.svg"
                width={448}
                height={448}
                className="m-auto block"
                alt="Personalized travel lists"
            />
            <section className="flex flex-col gap-y-4 sm:gap-y-8">
                <h4 className="h5">
                    {
                        <>
                            Plan seamlessly
                            <br />
                            with custom travel lists
                        </>
                    }
                </h4>
                <p>
                    {
                        'Organize your future trips by creating personalized lists of must-see places. Make travel planning simple, efficient, and fun.'
                    }
                </p>
                <div className="flex-none">
                    <LandingFeaturesListsButton />
                </div>
            </section>
        </div>
    )
}
