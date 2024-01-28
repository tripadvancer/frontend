import Link from 'next/link'

import { MapIcon } from '@/components/ui/icons'
import { getI18n } from '@/utils/i18n/i18n.server'

export const MapLink = async () => {
    const t = await getI18n()

    return (
        <Link href="/maps" className="flex items-center gap-x-2 text-big-bold">
            <MapIcon />
            <span className="hidden sm:block">{t('header.link.map')}</span>
        </Link>
    )
}
