'use client'

import { LogOutIcon } from 'lucide-react'
import Session from 'supertokens-web-js/recipe/session'

import { useRouter } from 'next/navigation'

import { useToast } from '@/components/providers/toast-provider'

type HeaderMobileSignoutButtonTypes = {
    closeMobileMenu: () => void
}

export const HeaderMobileSignoutButton = ({ closeMobileMenu }: HeaderMobileSignoutButtonTypes) => {
    const router = useRouter()
    const toast = useToast()

    const handleSignOut = async () => {
        try {
            await Session.signOut()
            closeMobileMenu()
            router.push('/')
            router.refresh()
        } catch {
            toast.error('An unexpected error has occurred. Please try again later.')
        }
    }

    return (
        <button
            onClick={handleSignOut}
            className="hover:text-red-active flex items-center justify-between gap-x-2 text-red-100"
        >
            Log Out
            <LogOutIcon size={20} />
        </button>
    )
}
