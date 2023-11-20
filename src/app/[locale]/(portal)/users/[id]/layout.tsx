import { Avatar } from '@/components/avatar/avatar'
import { getUserById } from '@/services/users'
import { getI18n } from '@/utils/i18n/i18n.server'

import { Achivement } from './_components/achievement'
import { Tabs } from './_components/tabs'

export default async function UserLayout({ params, children }: { params: { id: string }; children: React.ReactNode }) {
    const t = await getI18n()
    const user = await getUserById(params.id)

    return (
        <div className="container py-24">
            <div className="inner-container">
                <h1 className="mb-8 flex flex-col items-center gap-4 text-h1-m sm:text-h1 lg:mb-16 lg:flex-row">
                    <Avatar src={user.avatar} alt={user.name} size={64} />
                    {user.name}
                </h1>

                <div className="flex flex-col gap-16 lg:flex-row-reverse lg:gap-8">
                    <div className="flex w-full flex-col gap-8 lg:w-64">
                        <Achivement {...user._count} />

                        {user.info && (
                            <section>
                                <h3 className="mb-4 text-caps uppercase">{t('pages.user.about_me')}</h3>
                                <p>{user.info}</p>
                            </section>
                        )}
                    </div>

                    <div className="flex-1">
                        <Tabs userId={user.id} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
