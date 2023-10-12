import Link from 'next/link'
import type { Metadata } from 'next/types'

import { restoreAccount } from '@/services/auth'
import { ApiResponseStatus } from '@/utils/enums'
import { getScopedI18n } from '@/utils/i18n.server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getScopedI18n('pages.auth.restore.meta')

    return {
        title: t('title'),
        description: '',
    }
}

export default async function RestoreAccount({ params }: { params: { token: string } }) {
    const t = await getScopedI18n('pages.auth.restore')
    const tCommon = await getScopedI18n('common')
    const response = await restoreAccount({ token: params.token })

    return (
        <>
            <p className="text-center text-sm">
                {response.status === ApiResponseStatus.TOKEN_EXPIRED && t('token_expired')}
                {response.status === ApiResponseStatus.SUCCESS && t('success')}
            </p>

            <Link
                href="/"
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-custom-blue-100 px-6 text-sm text-white hover-animated hover:bg-custom-blue-active hover:text-white focus:outline-none"
            >
                {tCommon('cta.home')}
            </Link>
        </>
    )
}
