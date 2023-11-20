import { CategoriesEnum } from '@/utils/enums'

export const CategoriesSkeleton = () => {
    return (
        <div className="mx-auto flex flex-wrap justify-center gap-1 sm:w-2/3">
            {Array.from({ length: Object.keys(CategoriesEnum).length }).map((_, i) => (
                <div key={i} className="h-8 w-28 animate-pulse rounded-full bg-black-5" />
            ))}
        </div>
    )
}
