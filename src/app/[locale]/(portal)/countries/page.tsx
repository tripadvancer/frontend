import { Countries } from '@/components/features/countries/countries'
import { Country } from '@/components/features/country/country'
import { getCountryBySlug } from '@/services/countries'

export default async function CountriesPage({
    params,
    searchParams,
}: {
    params: { slug: string; locale: string }
    searchParams: { categories: string }
}) {
    return <Countries />
}
