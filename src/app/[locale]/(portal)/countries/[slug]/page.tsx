import { Categories } from '@/components/Categories/Categories'
import { CountryPlacesFeed } from '@/components/CountryPlacesFeed/CountryPlacesFeed'
import { getCategories } from '@/services/categories'
import { getCountryBySlug } from '@/services/countries'
import { getPlacesByCountryCode } from '@/services/places'
import { localizeCategories, parseQueryString } from '@/utils/helpers'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function CountryPlaces({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { categories: string }
}) {
    const tCategories = await getScopedI18n('categories')
    const country = getCountryBySlug(params.slug)
    const categories = await getCategories()
    const localizedCategories = localizeCategories(categories, tCategories)
    const categoriesIds = categories.map(category => category.id)
    const selectedCategoriesIdsFromQueryString = searchParams.categories?.toString().toLowerCase()
    const selectedCategoriesIds = parseQueryString(selectedCategoriesIdsFromQueryString, categoriesIds)
    const places = await getPlacesByCountryCode(country.code, selectedCategoriesIds.join())

    return (
        <>
            <div className="mx-auto mb-16 flex flex-wrap justify-center gap-1 sm:w-2/3">
                <Categories categories={localizedCategories} selectedCategoryIds={selectedCategoriesIds} />
            </div>
            <CountryPlacesFeed places={places} />
        </>
    )
}
