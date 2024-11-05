import { Country } from '@/components/features/pages/country/country'
import { getCountryBySlug } from '@/services/countries'

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ categories: string }>

export default async function CountryPage(props: { params: Params; searchParams: SearchParams }) {
    const params = await props.params
    const searchParams = await props.searchParams
    const country = getCountryBySlug(params.slug)
    const categoriesIdsFromQueryString = searchParams.categories?.toString().toLowerCase()

    return <Country country={country} categoriesIdsFromQueryString={categoriesIdsFromQueryString} />
}
