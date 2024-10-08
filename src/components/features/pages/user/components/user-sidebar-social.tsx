import { getTranslations } from 'next-intl/server'

import { getUserById } from '@/services/users'
import { UserSocialApps } from '@/utils/enums'

import { UserSidebarSocialLink } from './user-sidebar-social-link'

export const UserSidebarSocial = async ({ userId }: { userId: string }) => {
    const t = await getTranslations()
    const user = await getUserById(userId)

    if (!Object.keys(user.social).length) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('page.user.contacts')}</h3>
            <div className="flex flex-col gap-y-4">
                {Object.keys(user.social)
                    .sort()
                    .map(key => (
                        <UserSidebarSocialLink
                            key={`social-link-${key}`}
                            app={key as UserSocialApps}
                            appUsername={user.social[key as UserSocialApps]}
                        />
                    ))}
            </div>
        </section>
    )
}
