import { getTranslations } from 'next-intl/server'

export const UserSidebarAbout = async ({ info }: { info: string | null }) => {
    const t = await getTranslations()

    if (!info) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('page.user.aboutMe')}</h3>
            <p className="break-words">{info}</p>
        </section>
    )
}
