import type { IUser } from '@/utils/types/user'

import { getI18n } from '@/utils/i18n/i18n.server'

export const UserSidebarAbout = async (user: IUser) => {
    const t = await getI18n()

    if (!user.info) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('pages.user.about_me')}</h3>
            <p className="break-words">{user.info}</p>
        </section>
    )
}
