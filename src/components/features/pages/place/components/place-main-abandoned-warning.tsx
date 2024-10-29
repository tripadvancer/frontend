import { getTranslations } from 'next-intl/server'

import { AlertIcon24 } from '@/components/ui/icons'
import { Notice } from '@/components/ui/notice'

type PlaceMainAbandonedWarningProps = {
    categories: number[]
}

export const PlaceMainAbandonedWarning = async ({ categories }: PlaceMainAbandonedWarningProps) => {
    const t = await getTranslations()

    // abandoned category id = 1 from categoriesDictionary
    if (categories.includes(1)) {
        return <Notice message={t('page.place.abandonedWarning')} icon={<AlertIcon24 />} variant="red" />
    }

    return null
}
