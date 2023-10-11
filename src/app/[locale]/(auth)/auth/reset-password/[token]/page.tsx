import type { Metadata } from 'next/types'

import { RessetPasswordForm } from '@/components/Auth/RessetPasswordForm'
import { getScopedI18n } from '@/utils/i18n.server'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getScopedI18n('pages.auth.reset_password.meta')

    return {
        title: t('title'),
        description: '',
    }
}

export default async function RessetPassword({ params }: { params: { token: string } }) {
    return <RessetPasswordForm token={params.token} />
}
