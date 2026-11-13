'use client'

import { useMediaQuery } from 'usehooks-ts'

import Image from 'next/image'

import { useDialog } from '@/components/providers/dialog-provider'
import { ExternalLink } from '@/components/ui/external-link'
import { FormButton } from '@/components/ui/form-button'

const APP_LANDING_PAGE = 'https://mysavedplaces.com'

export const SendToMSP = ({ deepLink }: { deepLink: string }) => {
    const dialog = useDialog()
    const isMobile = useMediaQuery('(max-width: 639px)')
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(deepLink)}`

    return (
        <div className="flex w-full flex-col items-center gap-y-6 text-center sm:w-96">
            <Image src="/images/mysavedplaces/logo.svg" width={314} height={23} alt="My Saved Places" />
            <div>
                <p className="text-black-70">Scan this QR code with your phone to open My Saved Places.</p>
                <p className="text-black-70">
                    Learn more at <ExternalLink href={APP_LANDING_PAGE}>mysavedplaces.com</ExternalLink>
                </p>
            </div>
            <Image src={qrCodeUrl} width={240} height={240} alt="QR code to open My Saved Places" unoptimized />

            {isMobile ? (
                <a
                    href={deepLink}
                    className="hover-animated hover:bg-orange-active inline-flex h-10 w-full items-center justify-center rounded-lg bg-orange-100 px-6 font-medium whitespace-nowrap text-white hover:text-white"
                >
                    Open in My Saved Places
                </a>
            ) : (
                <FormButton type="stroke" variant="blue" className="w-full" onClick={dialog.close}>
                    Close
                </FormButton>
            )}
        </div>
    )
}
