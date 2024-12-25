import Image from 'next/image'
import Link from 'next/link'

import { SocialAppUrls, UserSocialApps } from '@/utils/enums'

export const UserSidebarSocialLink = ({ app, appUsername }: { app: UserSocialApps; appUsername?: string }) => {
    const socialLinks = {
        [UserSocialApps.FACEBOOK]: {
            icon: <Image src="/images/icons/social/facebook.svg" width={24} height={24} alt="Facebook" />,
            title: 'Facebook',
            url: SocialAppUrls.FACEBOOK,
        },
        [UserSocialApps.INSTAGRAM]: {
            icon: <Image src="/images/icons/social/instagram.svg" width={24} height={24} alt="Instagram" />,
            title: 'Instagram',
            url: SocialAppUrls.INSTAGRAM,
        },
        [UserSocialApps.TELEGRAM]: {
            icon: <Image src="/images/icons/social/telegram.svg" width={24} height={24} alt="Telegram" />,
            title: 'Telegram',
            url: SocialAppUrls.TELEGRAM,
        },
        [UserSocialApps.TIKTOK]: {
            icon: <Image src="/images/icons/social/tiktok.svg" width={24} height={24} alt="Tiktok" />,
            title: 'Tiktok',
            url: SocialAppUrls.TIKTOK,
        },
        [UserSocialApps.X]: {
            icon: <Image src="/images/icons/social/x.svg" width={24} height={24} alt="X" />,
            title: 'X',
            url: SocialAppUrls.X,
        },
        [UserSocialApps.YOUTUBE]: {
            icon: <Image src="/images/icons/social/youtube.svg" width={24} height={24} alt="Youtube" />,
            title: 'Youtube',
            url: SocialAppUrls.YOUTUBE,
        },
    }

    return (
        <Link
            href={socialLinks[app].url + appUsername}
            className="link inline-flex items-center gap-x-2 text-big-bold"
            target="_blank"
        >
            {socialLinks[app].icon}
            {socialLinks[app].title}
        </Link>
    )
}
