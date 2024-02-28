'use client'

import { userAPI } from '@/redux/services/user-api'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { UserSettingsBlockChangePassword } from './components/user-settings-block-change-password'
import { UserSettingsBlockRequestPersonalData } from './components/user-settings-block-request-personal-data'
import { UserSettingsBlockRequestUserDeletion } from './components/user-settings-block-request-user-deletion'
import { UserSettingsBlockChangeEmail } from './components/user-settings-block-сhange-email'
import { UserSettingsForm } from './components/user-settings-form'
import { UserSettingsSkeleton } from './user-settings-skeleton'

export const UserSettings = () => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const response = userAPI.useGetUserInfoQuery(undefined, { skip: !supertokens.isAuth })

    if (response.isSuccess) {
        return (
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-16">
                    <section>
                        <UserSettingsForm {...response.data} />
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

    return <UserSettingsSkeleton />
}
