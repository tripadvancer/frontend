import Link from 'next/link'

import {
    FacebookIcon24,
    InstagramIcon24,
    TelegramIcon24,
    TiktokIcon24,
    XIcon24,
    YoutubeIcon24,
} from '@/components/ui/icons'
import { SocialAppUrls, UserSocialApps } from '@/utils/enums'

export const UserSidebarSocialLink = ({ app, url }: { app: UserSocialApps; url: string }) => {
    const socialLinks = {
        [UserSocialApps.FACEBOOK]: {
            icon: <FacebookIcon24 />,
            title: 'Facebook',
            url: SocialAppUrls.FACEBOOK,
        },
        [UserSocialApps.INSTAGRAM]: {
            icon: <InstagramIcon24 />,
            title: 'Instagram',
            url: SocialAppUrls.INSTAGRAM,
        },
        [UserSocialApps.TELEGRAM]: {
            icon: <TelegramIcon24 />,
            title: 'Telegram',
            url: SocialAppUrls.TELEGRAM,
        },
        [UserSocialApps.TIKTOK]: {
            icon: <TiktokIcon24 />,
            title: 'Tiktok',
            url: SocialAppUrls.TIKTOK,
        },
        [UserSocialApps.X]: {
            icon: <XIcon24 />,
            title: 'X',
            url: SocialAppUrls.X,
        },
        [UserSocialApps.YOUTUBE]: {
            icon: <YoutubeIcon24 />,
            title: 'Youtube',
            url: SocialAppUrls.YOUTUBE,
        },
    }

    return (
        <Link
            href={socialLinks[app].url + url}
            className="link inline-flex items-center gap-x-2 text-big-bold"
            target="_blank"
        >
            {socialLinks[app].icon}
            {socialLinks[app].title}
        </Link>
    )
}
