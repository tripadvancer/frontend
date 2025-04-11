import { getTranslations } from 'next-intl/server'

type PlaceMainDescriptionProps = {
    description: string
}

export const PlaceMainDescription = async ({ description }: PlaceMainDescriptionProps) => {
    const t = await getTranslations()

    return (
        <section className="flex flex-col gap-y-8">
            <h2 className="h5">{t('page.place.about')}</h2>
            <div className="break-words text-big">{description}</div>
        </section>
    )
}
