import { UserName } from './components/user-name'
import { UserNavigation } from './components/user-navigation'
import { UserSidebarAbout } from './components/user-sidebar-about'
import { UserSidebarAchievement } from './components/user-sidebar-achievement'

export const User = ({ userId, children }: { userId: string; children: React.ReactNode }) => {
    return (
        <div className="container py-24">
            <div className="inner-container">
                <UserName userId={userId} />

                <div className="flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                    <div className="flex w-full flex-col gap-8 lg:w-64">
                        <UserSidebarAchievement userId={userId} />
                        <UserSidebarAbout userId={userId} />
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <UserNavigation userId={userId} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
