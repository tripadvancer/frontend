import { setStaticParamsLocale } from 'next-international/server'

import { ThirdPartyCallback } from '@/components/auth/third-party-callback'
import { getStaticParams } from '@/utils/i18n/i18n.server'

export function generateStaticParams() {
    return getStaticParams()
}

export default async function GoogleCallbackPage({ params }: { params: { locale: string } }) {
    setStaticParamsLocale(params.locale)
    return <ThirdPartyCallback />
}
