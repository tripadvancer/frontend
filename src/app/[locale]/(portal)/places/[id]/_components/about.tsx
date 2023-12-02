import type { IPlace } from '@/utils/types/place'

import { getI18n } from '@/utils/i18n/i18n.server'

import { DraftToHtml } from './draft-to-html'

type AboutProps = IPlace

export const About = async ({ description }: AboutProps) => {
    const t = await getI18n()

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="text-h5-m sm:text-h5">{t('pages.place.about.title')}</h2>
            <DraftToHtml json={description} />
        </section>
    )
}
