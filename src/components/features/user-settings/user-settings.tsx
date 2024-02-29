import { getUserById } from '@/services/users'
import { getI18n } from '@/utils/i18n/i18n.server'

import { UserSettingsBlockChangePassword } from './components/user-settings-block-change-password'
import { UserSettingsBlockRequestPersonalData } from './components/user-settings-block-request-personal-data'
import { UserSettingsBlockRequestUserDeletion } from './components/user-settings-block-request-user-deletion'
import { UserSettingsBlockChangeEmail } from './components/user-settings-block-сhange-email'
import { UserSettingsForm } from './components/user-settings-form'

export const UserSettings = async ({ userId }: { userId: string }) => {
    const t = await getI18n()
    const user = await getUserById(userId)

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-16">
                <section>
                    <UserSettingsForm {...user} />
                </section>
                <section>
                    <h2 className="mb-8 text-h5-m sm:text-h5">{t('pages.user.settings.account.title')}</h2>
                    <div className="flex flex-col gap-y-8">
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
