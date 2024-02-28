'use client'

import { userAPI } from '@/redux/services/user-api'
import { useI18n } from '@/utils/i18n/i18n.client'
import { useSupertokens } from '@/utils/supertokens/supertokens.hooks'

import { BlockChangePassword } from './components/block-change-password'
import { BlockRequestPersonalData } from './components/block-request-personal-data'
import { BlockRequestUserDeletion } from './components/block-request-user-deletion'
import { BlockChangeEmail } from './components/block-сhange-email'
import { SettingsForm } from './components/settings-form'
import { SettingsSkeleton } from './components/settings-skeleton'

export const UserSettings = () => {
    const t = useI18n()
    const supertokens = useSupertokens()
    const response = userAPI.useGetUserInfoQuery(undefined, { skip: !supertokens.isAuth })

    if (response.isSuccess) {
        return (
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-16">
                    <section>
                        <SettingsForm {...response.data} />
                    </section>
                    <section>
                        <h2 className="mb-8 text-h5-m sm:text-h5">{t('pages.user.settings.account.title')}</h2>
                        <div className="flex flex-col gap-y-8">
                            <BlockChangeEmail />
                            <BlockChangePassword />
                            <BlockRequestPersonalData />
                            <BlockRequestUserDeletion />
                        </div>
                    </section>
                </div>
            </div>
        )
    }

    return <SettingsSkeleton />
}
