import { Avatar } from '@/components/ui/avatar'
import { getUserById } from '@/services/users'
import { getI18n } from '@/utils/i18n/i18n.server'

import { UserAchievement } from './components/user-achievement'
import { UserNavigation } from './components/user-navigation'

export const User = async ({ userId, children }: { userId: string; children: React.ReactNode }) => {
    const t = await getI18n()
    const user = await getUserById(userId)

    return (
        <div className="container py-24">
            <div className="inner-container">
                <h1 className="mb-8 flex flex-col items-center gap-4 text-h1-m sm:text-h1 lg:mb-16 lg:flex-row">
                    <Avatar {...user} size={64} />
                    {user.name}
                </h1>

                <div className="flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                    <div className="flex w-full flex-col gap-8 lg:w-64">
                        <UserAchievement {...user._count} />

                        {user.info && (
                            <section>
                                <h3 className="mb-4 text-caps uppercase">{t('pages.user.about_me')}</h3>
                                <p>{user.info}</p>
                            </section>
                        )}
                    </div>

                    <div className="flex-1">
                        <UserNavigation {...user} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
