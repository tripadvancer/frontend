import { getTranslations } from 'next-intl/server'

import { getUserById } from '@/services/users'

import { UserSettingsBlockChangePassword } from './components/user-settings-block-change-password'
import { UserSettingsBlockRequestPersonalData } from './components/user-settings-block-request-personal-data'
import { UserSettingsBlockRequestUserDeletion } from './components/user-settings-block-request-user-deletion'
import { UserSettingsBlockChangeEmail } from './components/user-settings-block-сhange-email'
import { UserSettingsForm } from './components/user-settings-form'

export const UserSettings = async ({ userId }: { userId: string }) => {
    const t = await getTranslations()
    const user = await getUserById(userId)

    console.log(user)

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-16">
                <section>
                    <UserSettingsForm {...user} />
                </section>
                <section>
                    <h2 className="h5 mb-8">{t('page.user.account.title')}</h2>
                    <div className="flex flex-col">
                        <UserSettingsBlockChangeEmail />
                        <UserSettingsBlockChangePassword />
                        <UserSettingsBlockRequestPersonalData />
                        <UserSettingsBlockRequestUserDeletion />
                    </div>
                </section>
            </div>
        </div>
    )
}
