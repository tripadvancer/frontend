import { categoriesDictionary } from '@/utils/dictionaries/categories'

export const CategoriesSkeleton = () => {
    return (
        <div className="mx-auto flex flex-wrap justify-center gap-1 sm:w-2/3">
            {categoriesDictionary.map(category => (
                <div key={category.id} className="h-8 w-28 animate-pulse rounded-full bg-black-5" />
            ))}
        </div>
    )
}
