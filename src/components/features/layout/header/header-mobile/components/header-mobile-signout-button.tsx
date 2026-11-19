'use client'

import { LogOutIcon } from 'lucide-react'

import { useToast } from '@/components/providers/toast-provider'
import { UNEXPECTED_ERROR_MESSAGE } from '@/utils/constants'
import { useSignOut } from '@/utils/hooks/use-sign-out'

type HeaderMobileSignoutButtonTypes = {
    closeMobileMenu: () => void
}

export const HeaderMobileSignoutButton = ({ closeMobileMenu }: HeaderMobileSignoutButtonTypes) => {
    const toast = useToast()
    const signOut = useSignOut()

    const handleSignOut = async () => {
        try {
            closeMobileMenu()
            await signOut()
        } catch {
            toast.error(UNEXPECTED_ERROR_MESSAGE)
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
