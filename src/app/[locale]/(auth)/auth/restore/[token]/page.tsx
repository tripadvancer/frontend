import { LinkButton } from '@/components/link-button'
import { restoreAccount } from '@/services/auth'
import { ApiResponseStatus } from '@/utils/enums'
import { getI18n } from '@/utils/i18n/i18n.server'

export default async function RestoreAccountPage({ params }: { params: { token: string } }) {
    const t = await getI18n()
    const response = await restoreAccount({ token: params.token })

    return (
        <>
            <p className="text-center ">
                {response.status === ApiResponseStatus.TOKEN_EXPIRED && t('pages.auth.restore.token_expired')}
                {response.status === ApiResponseStatus.SUCCESS && t('pages.auth.restore.success')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.return_home')}
            </LinkButton>
        </>
    )
}
