import { notFound } from 'next/navigation'

import { getUserInfo } from '@/services/user'
import { getI18n } from '@/utils/i18n/i18n.server'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { ClaimEmailAttention } from './_components/claim-email-attention'
import { SettingsForm } from './_components/settings-form'
import { SettingGDPR } from './_components/settings-gdpr'
import { SettingsSkeleton } from './_components/settings-skeleton'

export default async function UserSettingsPage({ params }: { params: { id: string } }) {
    const t = await getI18n()
    const { session, hasToken } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            notFound()
        }

        return <TryRefreshComponent fallback={<SettingsSkeleton />} />
    }

    const accessTokenPayload = session.getAccessTokenPayload()
    const activeUserId = accessTokenPayload.userId

    if (activeUserId !== parseInt(params.id)) {
        notFound()
    }

    const userInfo = await getUserInfo(session.getAccessToken())

    return (
        <div className="flex flex-col gap-y-8">
            <ClaimEmailAttention />

            <div className="flex flex-col gap-y-16">
                <section>
                    <SettingsForm {...userInfo} />
                </section>
                <section>
                    <h2 className="mb-8 text-h5-m sm:text-h5">{t('pages.user.settings.gdpr.title')}</h2>
                    <SettingGDPR userId={parseInt(params.id)} />
                </section>
            </div>
        </div>
    )
}
