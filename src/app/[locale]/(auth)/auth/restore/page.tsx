import { LinkButton } from '@/components/link-button'
import { restoreUser } from '@/services/user'
import { getI18n } from '@/utils/i18n/i18n.server'

export default async function RestoreUserPage({ searchParams }: { searchParams: { token: string } }) {
    const t = await getI18n()
    const response = await restoreUser(searchParams.token)

    return (
        <>
            <p className="text-center">
                {response.status === 'OK' && t('pages.auth.restore.ok')}
                {response.status === 'INVALID_TOKEN_ERROR' && t('pages.auth.restore.token_expired')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.go_home')}
            </LinkButton>
        </>
    )
}
