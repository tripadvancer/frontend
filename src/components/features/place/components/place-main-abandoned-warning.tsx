import type { IPlace } from '@/utils/types/place'

import { AlertIcon24 } from '@/components/ui/icons'
import { getI18n } from '@/utils/i18n/i18n.server'

export const PlaceMainAbandonedWarning = async ({ categories }: IPlace) => {
    const t = await getI18n()

    // abandoned category id = 1 from categoriesDictionary
    if (categories.includes(1)) {
        return (
            <div className="relative rounded-lg bg-red-10 p-4 text-black-70">
                <div className="flex gap-x-2 sm:items-center">
                    <div className="text-red-100">
                        <AlertIcon24 />
                    </div>
                    {t('abandoned_warning')}
                </div>
            </div>
        )
    }

    return null
}
