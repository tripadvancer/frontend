'use client'

import { useMediaQuery } from 'usehooks-ts'

import Image from 'next/image'

import { useDialog } from '@/components/providers/dialog-provider'
import { ExternalLink } from '@/components/ui/external-link'
import { FormButton } from '@/components/ui/form-button'

export const SendToMSP = ({ deepLink }: { deepLink: string }) => {
    const dialog = useDialog()
    const isMobile = useMediaQuery('(max-width: 639px)')
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(deepLink)}`

    return (
        <div className="flex w-full flex-col items-center gap-y-8 py-10 text-center sm:w-96">
            <Image src="/images/mysavedplaces/logo.svg" width={314} height={23} alt="My Saved Places" />

            <p className="text-black-70">
                Scan this QR code with your phone to open{' '}
                <ExternalLink href="https://mysavedplaces.com">My Saved Places</ExternalLink>.
            </p>

            <Image src={qrCodeUrl} width={240} height={240} alt="QR code to open My Saved Places" unoptimized />

            <div className="space-y-2">
                {isMobile && (
                    <a
                        href={deepLink}
                        className="hover-animated hover:bg-orange-active inline-flex h-10 w-full items-center justify-center rounded-lg bg-orange-100 px-6 font-medium whitespace-nowrap text-white hover:text-white"
                    >
                        Open in My Saved Places
                    </a>
                )}
                <FormButton type="stroke" variant="blue" className="w-full" onClick={dialog.close}>
                    Close
                </FormButton>
            </div>
        </div>
    )
}
