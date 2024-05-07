import { ReactNode } from 'react'

import type { Metadata } from 'next/types'

import { UserNavigation } from '@/components/features/user/user-navigation'
import { UserSidebarAbout } from '@/components/features/user/user-sidebar-about'
import { UserSidebarAchievement } from '@/components/features/user/user-sidebar-achievement'
import { getUserById } from '@/services/users'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const user = await getUserById(params.id)

    return {
        title: {
            template: `%s | ${user.name} | Tripadvancer`,
            default: user.name,
        },
        robots: 'noindex, nofollow',
    }
}

export default function UserLayout({ params, children }: { params: { id: string }; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
            <div className="flex w-full flex-col gap-8 lg:w-64">
                <UserSidebarAchievement userId={params.id} />
                <UserSidebarAbout userId={params.id} />
            </div>

            <div className="min-w-0 flex-1">
                <UserNavigation userId={params.id} />
                {children}
            </div>
        </div>
    )
}
