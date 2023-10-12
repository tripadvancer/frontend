import { UserAchievement } from '@/components/Achievement/UserAchievement'
import { PageSwitcher } from '@/components/PageSwitcher'
import { getUserById } from '@/services/user'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function User({ params, children }: { params: { id: string }; children: React.ReactNode }) {
    const t = await getScopedI18n('pages.user')
    const user = await getUserById(params.id)

    return (
        <div className="container py-24">
            <div className="inner-container">
                <h1 className="mb-16 flex flex-row items-center gap-4 text-5xl phone:mb-8 phone:flex-col phone:text-4xl">
                    <div className="h-16 w-16 rounded-full bg-custom-orange-100" />
                    {user.name}
                </h1>

                <div className="flex flex-row gap-8 phone:flex-col-reverse phone:gap-16">
                    <div className="flex-1">
                        <PageSwitcher
                            nav={[
                                { href: `/users/${user.id}`, caption: t('places_link') },
                                { href: `/users/${user.id}/reviews`, caption: t('reviews_link') },
                            ]}
                            className="mb-8"
                        />
                        {children}
                    </div>
                    <div className="flex w-64 flex-col gap-8 phone:w-full">
                        <UserAchievement statistics={user._count} />
                        {user.info && (
                            <section>
                                <h3 className="mb-4 text-sm uppercase">{t('about_me')}</h3>
                                <p className="text-sm">{user.info}</p>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
