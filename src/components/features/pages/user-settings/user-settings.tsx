import { getTranslations } from 'next-intl/server'

import { getUserSettings } from '@/services/user'
import { getUserById } from '@/services/users'

import { UserSettingsBlockChangePassword } from './components/user-settings-block-change-password'
import { UserSettingsBlockRequestPersonalData } from './components/user-settings-block-request-personal-data'
import { UserSettingsBlockRequestUserDeletion } from './components/user-settings-block-request-user-deletion'
import { UserSettingsBlockChangeEmail } from './components/user-settings-block-сhange-email'
import { UserSettingsForm } from './components/user-settings-form'

export const UserSettings = async ({ userId }: { userId: string }) => {
    const t = await getTranslations()
    const [user, settings] = await Promise.all([getUserById(userId), getUserSettings()])

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-16">
                <section>
                    <UserSettingsForm {...user} {...settings} />
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
