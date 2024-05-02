import Link from 'next/link'

import { FacebookIcon24, GlobeIcon24, InstagramIcon24, TwitterIcon24, YoutubeIcon24 } from '@/components/ui/icons'
import { getUserById } from '@/services/users'
import { getI18n } from '@/utils/i18n/i18n.server'

export const UserSidebarContacts = async ({ userId }: { userId: string }) => {
    const t = await getI18n()
    const user = await getUserById(userId)

    return (
        <section>
            <h3 className="mb-4 text-caps uppercase">{t('pages.user.contacts')}</h3>

            <nav className="flex flex-col gap-y-4">
                <Link href="" className="flex gap-x-2 text-big-bold">
                    <FacebookIcon24 />
                    Facebook
                </Link>
                <Link href="" className="flex gap-x-2 text-big-bold">
                    <InstagramIcon24 />
                    Instagram
                </Link>
                <Link href="" className="flex gap-x-2 text-big-bold">
                    <YoutubeIcon24 />
                    Youtube
                </Link>
                <Link href="" className="flex gap-x-2 text-big-bold">
                    <TwitterIcon24 />X
                </Link>
                <Link href="" className="flex min-w-0 gap-x-2 text-big-bold">
                    <span className="flex-none">
                        <GlobeIcon24 />
                    </span>
                    <span className="min-w-0 break-words">
                        https://tripadvancer.me/akjsdfnjkandsfkjnajkdsfnjkadnfkjandjkfankjdsfn
                    </span>
                </Link>
            </nav>
        </section>
    )
}
