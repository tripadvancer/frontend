import { getTranslations } from 'next-intl/server'

import { getUserById } from '@/services/users'

export const UserSidebarAbout = async ({ userId }: { userId: string }) => {
    const t = await getTranslations()
    const user = await getUserById(userId)

    if (!user.info) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('page.user.aboutMe')}</h3>
            <p className="break-words">{user.info}</p>
        </section>
    )
}
