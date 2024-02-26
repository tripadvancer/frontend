'use client'

import { notFound } from 'next/navigation'

import { getIsAuth } from '@/redux/features/user-slice'
import { useAppSelector } from '@/redux/hooks'
import { userAPI } from '@/redux/services/user-api'
import { useI18n } from '@/utils/i18n/i18n.client'

import { BlockChangePassword } from './components/block-change-password'
import { BlockRequestPersonalData } from './components/block-request-personal-data'
import { BlockRequestUserDeletion } from './components/block-request-user-deletion'
import { BlockChangeEmail } from './components/block-сhange-email'
import { SettingsForm } from './components/settings-form'
import { SettingsSkeleton } from './components/settings-skeleton'

export const UserSettings = ({ userId }: { userId: string }) => {
    const t = useI18n()
    const isAuth = useAppSelector(getIsAuth)
    const userInfo = userAPI.useGetUserInfoQuery(undefined, { skip: !isAuth })

    if (!isAuth) {
        notFound()
    }

    if (userInfo.data && userInfo.data.id !== parseInt(userId)) {
        notFound()
    }

    if (userInfo.isSuccess) {
        return (
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-16">
                    <section>
                        <SettingsForm {...userInfo.data} />
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
