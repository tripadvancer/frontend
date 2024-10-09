import { getTranslations } from 'next-intl/server'

import type { IPlace } from '@/utils/types/place'

import { AlertIcon24 } from '@/components/ui/icons'
import { Notice } from '@/components/ui/notice'

export const PlaceMainAbandonedWarning = async ({ categories }: IPlace) => {
    const t = await getTranslations()

    // abandoned category id = 1 from categoriesDictionary
    if (categories.includes(1)) {
        return <Notice message={t('page.place.abandonedWarning')} icon={<AlertIcon24 />} variant="red" />
    }

    return null
}
