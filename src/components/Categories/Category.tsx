import type { ICategory } from '@/types/category'

import { getScopedI18n } from '@/utils/i18n.server'

type CategoryProps = ICategory

export const Category = async ({ id, name }: CategoryProps) => {
    const t = await getScopedI18n('categories')

    return (
        <div className="bg-blue-20 text-small hover:bg-blue-active hover-animated hover:text-blue-20 flex h-8 cursor-pointer items-center justify-center rounded-full px-4 text-blue-100">
            {name}
        </div>
    )
}
