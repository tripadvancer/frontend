'use client'

import { ReactNode } from 'react'

import Link from 'next/link'

import { useAppSettings } from '@/components/providers/settings-provider'

type SupportEmailLinkProps = {
    children?: ReactNode
}

export const SupportEmailLink = ({ children }: SupportEmailLinkProps) => {
    const settings = useAppSettings()

    if (!settings?.supportEmail) {
        return null
    }

    return <Link href={`mailto:${settings.supportEmail}`}>{children ?? settings.supportEmail}</Link>
}
