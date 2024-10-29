import { getTranslations } from 'next-intl/server'

import { getUserSettings } from '@/services/user'
import { UserSocialApps } from '@/utils/enums'

import { UserSettingsBlockChangePassword } from './components/user-settings-block-change-password'
import { UserSettingsBlockRequestPersonalData } from './components/user-settings-block-request-personal-data'
import { UserSettingsBlockRequestUserDeletion } from './components/user-settings-block-request-user-deletion'
import { UserSettingsBlockChangeEmail } from './components/user-settings-block-сhange-email'
import { UserSettingsForm } from './components/user-settings-form'

type UserSettingsProps = {
    name: string
    info: string
    avatar: string | null
    social: Partial<Record<UserSocialApps, string>>
}

export const UserSettings = async ({ name, info, avatar, social }: UserSettingsProps) => {
    const t = await getTranslations()
    const settings = await getUserSettings()

    return (
        <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-16">
                <section>
                    <UserSettingsForm name={name} info={info} avatar={avatar} social={social} settings={settings} />
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
