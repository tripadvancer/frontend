import type { IPlace } from '@/utils/types/place'

import { DraftToHtml } from '@/components/ui/draft-to-html'
import { getI18n } from '@/utils/i18n/i18n.server'

export const PlaceMainDescription = async ({ description }: IPlace) => {
    const t = await getI18n()

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">{t('pages.place.about.title')}</h2>
            <div className="break-words">
                <DraftToHtml draft={description} />
            </div>
        </section>
    )
}
