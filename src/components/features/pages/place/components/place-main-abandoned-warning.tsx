import { getTranslations } from 'next-intl/server'

import type { IPlace } from '@/utils/types/place'

import { AlertIcon24 } from '@/components/ui/icons'

export const PlaceMainAbandonedWarning = async ({ categories }: IPlace) => {
    const t = await getTranslations()

    // abandoned category id = 1 from categoriesDictionary
    if (categories.includes(1)) {
        return (
            <div className="flex gap-x-2 rounded-2xl border border-red-100 p-4 text-big sm:items-center">
                <div className="text-red-100">
                    <AlertIcon24 />
                </div>
                {t('page.place.abandonedWarning')}
            </div>
        )
    }

    return null
}
