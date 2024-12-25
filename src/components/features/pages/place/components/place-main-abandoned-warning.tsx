import { SkullIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

import { Notice } from '@/components/ui/notice'

type PlaceMainAbandonedWarningProps = {
    categories: number[]
}

export const PlaceMainAbandonedWarning = async ({ categories }: PlaceMainAbandonedWarningProps) => {
    const t = await getTranslations()

    // abandoned category id = 1 from categoriesDictionary
    if (categories.includes(1)) {
        return <Notice message={t('page.place.abandonedWarning')} icon={<SkullIcon />} variant="red" />
    }

    return null
}
