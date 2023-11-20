import { LinkButton } from '@/components/link-button'
import { confirmRemoval } from '@/services/auth'
import { ApiResponseStatus } from '@/utils/enums'
import { getI18n } from '@/utils/i18n/i18n.server'

export default async function ConfirmAccountRemoval({ params }: { params: { token: string } }) {
    const t = await getI18n()
    const response = await confirmRemoval({ token: params.token })

    return (
        <>
            <p className="text-center ">
                {response.status === ApiResponseStatus.TOKEN_EXPIRED && t('pages.auth.confirm_removal.token_expired')}
                {response.status === ApiResponseStatus.SUCCESS && t('pages.auth.confirm_removal.success')}
            </p>
            <LinkButton href="/" className="w-full">
                {t('common.action.return_home')}
            </LinkButton>
        </>
    )
}
