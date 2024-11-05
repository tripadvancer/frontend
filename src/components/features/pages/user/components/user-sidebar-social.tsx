import { getTranslations } from 'next-intl/server'

import { UserSocialApps } from '@/utils/enums'

import { UserSidebarSocialLink } from './user-sidebar-social-link'

type UserSidebarSocialProps = {
    social: Partial<Record<UserSocialApps, string>>
}

export const UserSidebarSocial = async ({ social }: UserSidebarSocialProps) => {
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
