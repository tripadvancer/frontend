'use client'

import { LogOutIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'

type HeaderMobileSignoutButtonTypes = {
    closeMobileMenu: () => void
}

export const HeaderMobileSignoutButton = ({ closeMobileMenu }: HeaderMobileSignoutButtonTypes) => {
    const t = useTranslations()
    const router = useRouter()
    const toast = useToast()

    const handleSignOut = async () => {
        try {
            await Session.signOut()
            closeMobileMenu()
            router.push('/')
            router.refresh()
        } catch {
            toast.error(t('common.error'))
        }
    }

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center justify-between gap-x-2 text-red-100 hover:text-red-active"
        >
            Log Out
            <LogOutIcon size={20} />
        </button>
    )
}
