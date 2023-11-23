import UserMetadata from 'supertokens-node/recipe/usermetadata'

import { notFound } from 'next/navigation'

import { getUserInfo } from '@/services/user'
import { getI18n } from '@/utils/i18n/i18n.server'
import { getSSRSession } from '@/utils/supertokens/session.utils'
import { TryRefreshComponent } from '@/utils/supertokens/try-refresh-client-component'

import { SettingsForm } from './_components/settings-form'
import { SettingGDPR } from './_components/settings-gdpr'
import { SettingsSkeleton } from './_components/settings-skeleton'

export default async function UserSettings({ params }: { params: { id: string } }) {
    const t = await getI18n()
    const { session, hasToken, hasInvalidClaims } = await getSSRSession()

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            notFound()
        }

        /**
         * `hasInvalidClaims` indicates that session claims did not pass validation. For example if email
         * verification is required but the user's email has not been verified.
         */
        if (hasInvalidClaims) {
            /**
             * This means that one of the session claims is invalid. You should redirect the user to
             * the appropriate page depending on which claim is invalid.
             */
            notFound()
        } else {
            /**
             * This means that the session does not exist but we have session tokens for the user. In this case
             * the `TryRefreshComponent` will try to refresh the session.
             */
            return <TryRefreshComponent />
        }
    }

    const { metadata } = await UserMetadata.getUserMetadata(session.getUserId())

    if (metadata.userId !== parseInt(params.id)) {
        notFound()
    }

    const userInfo = await getUserInfo(session.getAccessToken())

    return (
        <div className="flex flex-col gap-y-16">
            <section>
                <SettingsForm {...userInfo} />
            </section>
            <section>
                <h2 className="mb-8 text-h5-m sm:text-h5">{t('pages.user.settings.gdpr.title')}</h2>
                <SettingGDPR userId={parseInt(params.id)} />
            </section>
        </div>
    )
}
