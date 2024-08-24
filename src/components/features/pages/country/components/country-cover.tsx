'use client'

import { ParallaxBanner } from 'react-scroll-parallax'

export const CountryCover = ({ countryCode }: { countryCode: string }) => {
    return (
        <ParallaxBanner
            layers={[
                {
                    image: `/images/countries/public/${countryCode.toLowerCase()}.jpg`,
                    speed: -20,
                },
            ]}
            className="h-full w-full object-cover"
        />
    )
}
