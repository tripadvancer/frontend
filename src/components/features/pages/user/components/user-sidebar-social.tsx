import { getTranslations } from 'next-intl/server'

import Link from 'next/link'

import {
    FacebookIcon24,
    InstagramIcon24,
    TelegramIcon24,
    TiktokIcon24,
    XIcon24,
    YoutubeIcon24,
} from '@/components/ui/icons'
import { getUserById } from '@/services/users'
import { SocialApps } from '@/utils/enums'

export const UserSidebarSocial = async ({ userId }: { userId: string }) => {
    const t = await getTranslations()
    const user = await getUserById(userId)

    if (!Object.keys(user.social).length) {
        return null
    }

    const socialLinks = {
        [SocialApps.FACEBOOK]: {
            icon: <FacebookIcon24 />,
            title: 'Facebook',
        },
        [SocialApps.INSTAGRAM]: {
            icon: <InstagramIcon24 />,
            title: 'Instagram',
        },
        [SocialApps.TELEGRAM]: {
            icon: <TelegramIcon24 />,
            title: 'Telegram',
        },
        [SocialApps.TIKTOK]: {
            icon: <TiktokIcon24 />,
            title: 'Tiktok',
        },
        [SocialApps.X]: {
            icon: <XIcon24 />,
            title: 'X',
        },
        [SocialApps.YOUTUBE]: {
            icon: <YoutubeIcon24 />,
            title: 'Youtube',
        },
    }

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('page.user.contacts')}</h3>
            <div className="flex flex-col gap-y-4">
                {Object.keys(user.social)
                    .sort()
                    .map(key => {
                        return (
                            <Link
                                href={user.social[key as SocialApps]}
                                key={`social-link-${key}`}
                                className="link inline-flex items-center gap-x-2 text-big-bold"
                                target="_blank"
                            >
                                {socialLinks[key as SocialApps].icon}
                                {socialLinks[key as SocialApps].title}
                            </Link>
                        )
                    })}
            </div>
        </section>
    )
}
