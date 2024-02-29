import { Country } from '@/components/features/country/country'
import { getCountryBySlug } from '@/services/countries'

export default async function CountryPage({
    params,
    searchParams,
}: {
    params: { slug: string; locale: string }
    searchParams: { categories: string }
}) {
    const country = getCountryBySlug(params.slug)
    const categoriesIdsFromQueryString = searchParams.categories?.toString().toLowerCase()
    return <Country country={country} categoriesIdsFromQueryString={categoriesIdsFromQueryString} />
}
