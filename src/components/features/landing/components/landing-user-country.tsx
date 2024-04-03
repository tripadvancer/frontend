// This is component don't use now
import Link from 'next/link'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16 } from '@/components/ui/icons'
import { getCountries, getCountryByCode } from '@/services/countries'
import { getUserCountryCode } from '@/services/edge-geo'
import { getPlacesByCountryCode } from '@/services/places'
import { getCurrentLocale } from '@/utils/i18n/i18n.server'

export const LandingUserCountry = async () => {
    const locale = getCurrentLocale()
    const countries = await getCountries()
    const forbiddenCountries = process.env.COUNTRIES_FORBIDDEN?.split(',') || []
    const userCountry = await getUserCountryCode()

    if (
        !userCountry ||
        !countries.find(country => country.countryCode === userCountry) ||
        forbiddenCountries.includes(userCountry)
    ) {
        return null
    }

    const country = getCountryByCode(userCountry)
    const places = await getPlacesByCountryCode(userCountry, undefined)

    if (!country || places.length === 0) {
        return null
    }

    return (
        <section>
            <h2 className="mb-4 text-center text-h3-m sm:text-h3">Explore places near you</h2>
            <p className="m-auto mb-16 w-full text-center text-big text-black-70 sm:w-2/3">Bla bla bla</p>

            <div className="flex flex-col gap-8 rounded-2xl bg-orange-10 px-4 py-8 sm:flex-row sm:p-8">
                <Link
                    href={`/countries/${country.slug}`}
                    className="relative h-[416px] w-full rounded-2xl"
                    style={{
                        backgroundImage: `url(/images/countries/public/${userCountry}.jpg)`,
                        backgroundSize: 'cover',
                    }}
                />

                <div className="flex flex-none basis-80 flex-col gap-y-8 sm:justify-between">
                    <div>
                        <div className="mb-4 text-h7-m sm:text-h7">{country.name[locale]}</div>
                        <div className="mb-4 h-[1px] bg-black-70 sm:mb-8" />
                        <p className="text-small">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ornare scelerisque nisl
                            nec consequat. Vestibulum eu malesuada ligula, eu iaculis est. Quisque mattis diam ligula,
                            id imperdiet libero iaculis et. In vitae turpis tortor.
                            <br />
                            <br />
                            Pellentesque vehicula tellus nunc, quis viverra sem ullamcorper eu. Integer dictum purus
                            magna, sed blandit nibh consectetur et. Proin mollis ligula at mi tempor, id luctus felis
                            iaculis. Ut sit amet tincidunt velit, ut aliquet augue. Sed luctus ac magna non gravida.
                            Suspendisse potenti. Proin eu massa tempus metus tristique scelerisque.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <FormButton className="sm:basis-1/2">View all places</FormButton>
                        <FormButton className="sm:basis-1/2" type="stroke" icon={<MapIcon16 />}>
                            Go to map
                        </FormButton>
                    </div>
                </div>
            </div>
        </section>
    )
}
