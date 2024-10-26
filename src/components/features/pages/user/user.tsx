import { ReactNode } from 'react'

import type { IUser } from '@/utils/types/user'

import { UserName } from './components/user-name'
import { UserNavigation } from './components/user-navigation'
import { UserSidebarAbout } from './components/user-sidebar-about'
import { UserSidebarAchievement } from './components/user-sidebar-achievement'
import { UserSidebarSocial } from './components/user-sidebar-social'

export const User = ({ user, children }: { user: IUser; children: ReactNode }) => {
    return (
        <div className="container py-24">
            <div className="inner-container">
                <UserName user={user} />

                <div className="flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                    <div className="flex w-full flex-col gap-8 lg:w-64">
                        <UserSidebarAchievement {...user._count} />
                        <UserSidebarAbout info={user.info} />
                        <UserSidebarSocial social={user.social} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <UserNavigation user={user} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
