import { ChevronRightIcon } from 'lucide-react'

import Link from 'next/link'

import { getCountryByCode } from '@/utils/helpers/countries'

type PlaceHeaderCountryProps = {
    countryCode: string | null
}

export const PlaceHeaderCountry = async ({ countryCode }: PlaceHeaderCountryProps) => {
    const country = getCountryByCode(countryCode)

    if (!country) {
        return
    }

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 text-sm font-medium">
                <li>
                    <Link href="/" className="hover:text-blue-active text-blue-100">
                        All countries
                    </Link>
                </li>
                <li aria-hidden="true" className="text-black-40">
                    <ChevronRightIcon size={16} />
                </li>
                <li>
                    <Link href={`/${country.slug}`} className="hover:text-blue-active text-blue-100">
                        Places in {country.name}
                    </Link>
                </li>
            </ol>
        </nav>
    )
}
