import Link from 'next/link'
import type { Metadata } from 'next/types'

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
            <p className="text-center text-sm">
                {response.status === ApiResponseStatus.TOKEN_EXPIRED && t('token_expired')}
                {response.status === ApiResponseStatus.SUCCESS && t('success')}
            </p>

            <Link
                href="/"
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-custom-blue-100 px-6 text-sm text-white transition-colors duration-300 ease-in-out hover:bg-custom-blue-active hover:text-white focus:outline-none"
            >
                {tCommon('cta.home')}
            </Link>
        </>
    )
}
