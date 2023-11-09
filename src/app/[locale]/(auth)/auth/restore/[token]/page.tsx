import { LinkButton } from '@/components/link-button'
import { restoreAccount } from '@/services/auth'
import { ApiResponseStatus } from '@/utils/enums'
import { getScopedI18n } from '@/utils/i18n/i18n.server'

export default async function RestoreAccount({ params }: { params: { token: string } }) {
    const t = await getScopedI18n('pages.auth.restore')
    const tCommon = await getScopedI18n('common')
    const response = await restoreAccount({ token: params.token })

    return (
        <>
            <p className="text-center ">
                {response.status === ApiResponseStatus.TOKEN_EXPIRED && t('token_expired')}
                {response.status === ApiResponseStatus.SUCCESS && t('success')}
            </p>
            <LinkButton href="/" className="w-full">
                {tCommon('cta.home')}
            </LinkButton>
        </>
    )
}
