'use client'

import { useScopedI18n } from '@/utils/i18n.client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const t = useScopedI18n('common')

    return (
        <div className="text-center">
            <p className="text-sm text-custom-black-40">{t('error')}</p>
            {/* todo: remove error message */}
            {/* <div className="p-4 font-mono text-xs">{error.message}</div> */}
        </div>
    )
}
