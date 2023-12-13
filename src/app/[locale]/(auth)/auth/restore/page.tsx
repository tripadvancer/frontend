import { LinkButton } from '@/components/link-button'
import { restoreAccount } from '@/services/user'
import { getI18n } from '@/utils/i18n/i18n.server'

export default async function RestoreAccountPage({ searchParams }: { searchParams: { token: string } }) {
    const t = await getI18n()
    const response = await restoreAccount(searchParams.token)

    return (
        <>
            <p className="text-center">
                {response.status === 'TOKEN_EXPIRED' && t('pages.auth.restore.token_expired')}
                {response.status === 'SUCCESS' && t('pages.auth.restore.success')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.go_home')}
            </LinkButton>
        </>
    )
}
