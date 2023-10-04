import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next/types'

import getIntl from '@/utils/intl'

import { CountryFeed } from '@/components/CountryFeed'
import { getCountries } from '@/services/countries'

export const runtime = 'edge'

export async function generateMetadata(): Promise<Metadata> {
    const intl = await getIntl('landing')

    return {
        title: intl.formatMessage({ id: 'meta.title' }),
        description: intl.formatMessage({ id: 'meta.description' }),
    }
}

export default async function Landing() {
    const intl = await getIntl('landing')
    const countries = await getCountries()

    return (
        <div className="container py-24">
            <section className="mb-24">
                <h1 className="mb-5 text-center text-5xl">{intl.formatMessage({ id: 'main.title' })}</h1>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    {intl.formatMessage({ id: 'main.text' })}
                </p>
                <CountryFeed countries={countries} />
            </section>

            <section className="mb-24">
                <h2 className="mb-5 text-center text-4xl">{intl.formatMessage({ id: 'features.title' })}</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    {intl.formatMessage({ id: 'features.text' })}
                </p>

                <div className="mb-8 flex flex-row items-center gap-16">
                    <Image src="/images/pic-1.svg" width={448} height={448} alt="" />
                    <div>
                        <h3 className="mb-8 text-3xl">{intl.formatMessage({ id: 'features.places.title' })}</h3>
                        <p className="text-sm">{intl.formatMessage({ id: 'features.places.text' })}</p>
                    </div>
                </div>

                <div className="mb-8 flex flex-row items-center gap-16">
                    <div className="text-right">
                        <h3 className="mb-8 text-3xl">{intl.formatMessage({ id: 'features.random.title' })}</h3>
                        <p className="text-sm">{intl.formatMessage({ id: 'features.random.text' })}</p>
                    </div>
                    <Image src="/images/pic-2.svg" width={448} height={448} alt="" />
                </div>

                <div className="flex flex-row items-center gap-16">
                    <Image src="/images/pic-3.svg" width={448} height={448} alt="" />
                    <div>
                        <h3 className="mb-8 text-3xl">{intl.formatMessage({ id: 'features.lists.title' })}</h3>
                        <p className="text-sm">{intl.formatMessage({ id: 'features.lists.text' })}</p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-5 text-center text-4xl">{intl.formatMessage({ id: 'map.title' })}</h2>
                <p className="m-auto mb-16 w-2/3 text-center text-base text-custom-black-70">
                    {intl.formatMessage({ id: 'map.text' })}
                </p>

                <div className="relative">
                    <Image src="/images/map.svg" width={1120} height={400} alt="" />
                    <Link
                        href="/map"
                        className="absolute left-1/2 top-1/2 flex h-10 -translate-x-1/2 -translate-y-1/2 transform items-center rounded-lg bg-custom-orange-100 px-6 text-sm font-medium text-white transition-colors duration-300 ease-in-out hover:bg-custom-orange-active hover:text-white"
                    >
                        {intl.formatMessage({ id: 'map.cta.caption' })}
                    </Link>
                </div>
            </section>
        </div>
    )
}
