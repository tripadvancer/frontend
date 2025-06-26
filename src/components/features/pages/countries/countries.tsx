import { MapIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { CountriesGrid } from '@/components/features/common/countries-grid/countries-grid'
import { LinkButton } from '@/components/ui/link-button'
import { getCountries } from '@/services/countries'
import { getSettings } from '@/services/settings'

export const Countries = async () => {
    const t = await getTranslations()
    const countries = await getCountries()
    const settings = await getSettings()

    return (
        <div className="container py-24">
            <section>
                <div className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row">
                    <div className="space-y-2">
                        <h1 className="h1">{t('page.countries.title')}</h1>
                        <p className="text-big text-black-70">
                            {t.rich('page.countries.description', {
                                placesCount: settings.placesCount,
                                countriesCount: settings.countriesCount,
                            })}
                        </p>
                    </div>
                    <LinkButton href="/maps" className="flex w-full items-center gap-2 sm:mt-2 sm:w-auto">
                        <MapIcon />
                        {t('page.countries.goToMap')}
                    </LinkButton>
                </div>
                <CountriesGrid countries={countries} />
            </section>
        </div>
    )
}
