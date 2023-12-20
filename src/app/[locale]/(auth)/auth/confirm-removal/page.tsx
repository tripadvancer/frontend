import { LinkButton } from '@/components/link-button'
import { confirmUserRemoval } from '@/services/user'
import { getI18n } from '@/utils/i18n/i18n.server'

export default async function ConfirmUserRemovalPage({ searchParams }: { searchParams: { token: string } }) {
    const t = await getI18n()
    const response = await confirmUserRemoval(searchParams.token)

    return (
        <>
            <p className="text-center">
                {response.status === 'OK' && t('pages.auth.confirm_removal.ok')}
                {response.status === 'INVALID_TOKEN_ERROR' && t('pages.auth.confirm_removal.token_expired')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.go_home')}
            </LinkButton>
        </>
    )
}
