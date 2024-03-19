import type { IPlace } from '@/utils/types/place'

import { AlertIcon16 } from '@/components/ui/icons'
import { Notice } from '@/components/ui/notice'
import { getI18n } from '@/utils/i18n/i18n.server'

export const PlaceHeaderAbandonedWarning = async ({ categories }: IPlace) => {
    const t = await getI18n()

    // abandoned category id = 1 from categoriesDictionary
    if (categories.includes(1)) {
        return (
            <Notice type="warning">
                <div className="flex gap-x-2 sm:items-center sm:justify-center">
                    <div className="text-red-100">
                        <AlertIcon16 />
                    </div>
                    {t('abandoned_warning')}
                </div>
            </Notice>
        )
    }

    return null
}
