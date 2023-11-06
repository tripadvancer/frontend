import UserMetadata from 'supertokens-node/recipe/usermetadata'

import { notFound } from 'next/navigation'

import { UserSettingGDPRActions } from '@/components/user-settings/account-gdpr-actions'
import { UserSettingsForm } from '@/components/user-settings/user-settings-form'
import { getUserProfile } from '@/services/user'
import { getScopedI18n } from '@/utils/i18n.server'
import { getSSRSession } from '@/utils/session.utils'

export default async function UserSettings({ params }: { params: { id: string } }) {
    const t = await getScopedI18n('pages.user.settings')
    const { session } = await getSSRSession()

    if (!session) {
        notFound()
    }

    const { metadata } = await UserMetadata.getUserMetadata(session.getUserId())

    if (metadata.userId !== parseInt(params.id)) {
        notFound()
    }

    const userInfo = await getUserProfile(session.getAccessToken())

    return (
        <div className="flex flex-col gap-y-16">
            <section>
                <UserSettingsForm {...userInfo} />
            </section>
            <section>
                <h2 className="mb-8 text-h5-m sm:text-h5">{t('gdpr.title')}</h2>
                <UserSettingGDPRActions userId={parseInt(params.id)} />
            </section>
        </div>
    )
}
