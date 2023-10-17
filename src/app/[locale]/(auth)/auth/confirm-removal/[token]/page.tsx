import Link from 'next/link'
import type { Metadata } from 'next/types'

import { LinkButton } from '@/components/LinkButton'
import { confirmRemoval } from '@/services/auth'
import { ApiResponseStatus } from '@/utils/enums'
import { getScopedI18n } from '@/utils/i18n.server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getScopedI18n('pages.auth.confirm_removal.meta')

    return {
        title: t('title'),
        description: '',
    }
}

export default async function ConfirmAccountRemoval({ params }: { params: { token: string } }) {
    const t = await getScopedI18n('pages.auth.confirm_removal')
    const tCommon = await getScopedI18n('common')
    const response = await confirmRemoval({ token: params.token })

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
