import { getUserById } from '@/services/users'

import { UserName } from './components/user-name'
import { UserNavigation } from './components/user-navigation'
import { UserSidebarAbout } from './components/user-sidebar-about'
import { UserSidebarAchievement } from './components/user-sidebar-achievement'

export const User = async ({ userId, children }: { userId: string; children: React.ReactNode }) => {
    const user = await getUserById(userId)

    return (
        <div className="container py-24">
            <div className="inner-container">
                <UserName {...user} />

                <div className="flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                    <div className="flex w-full flex-col gap-8 lg:w-64">
                        <UserSidebarAchievement {...user._count} />
                        <UserSidebarAbout {...user} />
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <UserNavigation {...user} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
