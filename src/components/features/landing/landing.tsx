import Image from 'next/image'
import Link from 'next/link'

import { getCountries } from '@/services/countries'
import { getI18n } from '@/utils/i18n/i18n.server'

import { LandingCountries } from './components/landing-countries'
import { LandingHeroCountry } from './components/landing-hero-country'

export const Landing = async () => {
    const t = await getI18n()
    const countries = await getCountries()

    return (
        <div className="container flex flex-col gap-y-24 py-24">
            <section>
                <h1 className="h1 mb-4 text-center">{t('pages.home.countries.title')}</h1>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('pages.home.countries.description')}
                </p>
                <LandingCountries countries={countries} />
            </section>

            {/* <section>
                <h2 className="mb-4 text-center h3">Explore places near you</h2>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('pages.home.features.description')}
                </p>
                <LandingHeroCountry />
            </section> */}

            <section>
                <h2 className="h3 mb-4 text-center">{t('pages.home.features.title')}</h2>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('pages.home.features.description')}
                </p>

                <div className="inner-container flex flex-col gap-y-16 sm:gap-y-8">
                    <div className="grid-row-2 grid items-center gap-y-8 sm:grid-cols-2 sm:grid-rows-none sm:gap-x-16">
                        <Image src="/images/pic-1.svg" width={448} height={448} className="m-auto block" alt="" />
                        <section>
                            <h3 className="h5 mb-4 sm:mb-8">{t('onboarding.features.places.title', { br: <br /> })}</h3>
                            <div className="flex flex-col gap-y-4">
                                <p>{t('onboarding.features.places.description.1')}</p>
                                <p>{t('onboarding.features.places.description.2')}</p>
                            </div>
                        </section>
                    </div>

                    <div className="grid-row-2 grid items-center gap-y-8 sm:grid-cols-2 sm:grid-rows-none sm:gap-x-16">
                        <Image src="/images/pic-2.svg" width={448} height={448} className="m-auto block" alt="" />
                        <section className="sm:-order-1 sm:text-right">
                            <h3 className="h5 mb-4 sm:mb-8">{t('onboarding.features.random.title', { br: <br /> })}</h3>
                            <p>{t('onboarding.features.random.description')}</p>
                        </section>
                    </div>

                    <div className="grid-row-2 grid items-center gap-y-8 sm:grid-cols-2 sm:grid-rows-none sm:gap-x-16">
                        <Image src="/images/pic-3.svg" width={448} height={448} className="m-auto block" alt="" />
                        <section>
                            <h3 className="h5sm:mb-8 mb-4">{t('onboarding.features.lists.title', { br: <br /> })}</h3>
                            <p>{t('onboarding.features.lists.description')}</p>
                        </section>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="h3 mb-4 text-center">{t('pages.home.map.title')}</h2>
                <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">
                    {t('pages.home.map.description')}
                </p>

                <div className="relative">
                    <Image src="/images/map.svg" width={1120} height={400} alt="" />
                    <Link
                        href="/maps"
                        className="hover-animated absolute left-1/2 top-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap rounded-lg bg-orange-100 px-6 text-white hover:bg-orange-active hover:text-white"
                    >
                        {t('pages.home.map.cta')}
                    </Link>
                </div>
            </section>
        </div>
    )
}
