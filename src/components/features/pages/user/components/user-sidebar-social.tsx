import { getTranslations } from 'next-intl/server'

import type { IUserSocial } from '@/utils/types/user'

import { UserSocialApps } from '@/utils/enums'

import { UserSidebarSocialLink } from './user-sidebar-social-link'

export const UserSidebarSocial = async ({ social }: { social: IUserSocial }) => {
    const t = await getTranslations()

    if (!Object.keys(social).length) {
        return null
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('page.user.contacts')}</h3>
            <div className="flex flex-col gap-y-4">
                {Object.keys(social)
                    .sort()
                    .map(key => (
                        <UserSidebarSocialLink
                            key={`social-link-${key}`}
                            app={key as UserSocialApps}
                            appUsername={social[key as UserSocialApps]}
                        />
                    ))}
            </div>
        </section>
    )
}
