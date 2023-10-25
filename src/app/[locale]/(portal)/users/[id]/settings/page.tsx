import { UserSettingGDPRActions } from '@/components/user-settings/account-gdpr-actions'
import { getScopedI18n } from '@/utils/i18n.server'

export default async function UserSettings({ params }: { params: { id: string } }) {
    const t = await getScopedI18n('pages.user.settings')

    return (
        <div className="flex flex-col gap-y-16">
            <section>Settings</section>
            <section>
                <h2 className="mb-8 text-h5-m sm:text-h5">{t('gdpr.title')}</h2>
                <UserSettingGDPRActions userId={parseInt(params.id)} />
            </section>
        </div>
    )
}
