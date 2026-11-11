'use client'

import Link from 'next/link'

import { useDialog } from '@/components/providers/dialog-provider'
import { useToast } from '@/components/providers/toast-provider'
import { Confirmation } from '@/components/ui/confirmation'
import { userAPI } from '@/utils/redux/services/user/user.api'

export const UserSettingsBlockRequestPersonalData = () => {
    const dialog = useDialog()
    const toast = useToast()

    const [requestPersonalData] = userAPI.useRequestPersonalDataMutation()

    const handleRequestPersonalData = () => {
        dialog.open(
            <Confirmation
                title="Send personal data"
                message="Are you sure you want to send your personal data to your email?"
                onConfirm={async () => {
                    dialog.close()
                    try {
                        await requestPersonalData()
                        toast.success('Your personal data has been sent to your email.')
                    } catch {
                        toast.error('An unexpected error has occurred. Please try again later.')
                    }
                }}
            />,
        )
    }

    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="h7">Personal Information</div>
                <div className="link font-medium" onClick={handleRequestPersonalData}>
                    Get a copy of data
                </div>
            </div>
            <div>
                You may request a copy of the personal data we hold about you. This includes any information you
                provided to us when you registered, such as your username, email address, and other additional details.
                For more information, please refer to our{' '}
                <Link href="/legal/privacy-policy" target="_blank">
                    Privacy Policy
                </Link>
                .
            </div>
        </div>
    )
}
