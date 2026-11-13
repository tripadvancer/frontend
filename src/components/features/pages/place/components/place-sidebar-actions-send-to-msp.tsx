'use client'

import Image from 'next/image'

import { SendToMSP } from '@/components/features/dialogs/send-to-msp/send-to-msp'
import { useDialog } from '@/components/providers/dialog-provider'
import { GeoJsonPoint } from '@/utils/types/geo'

const APP_ICON = ''

type PlaceSidebarActionsSendToMSPProps = {
    title: string
    location: GeoJsonPoint
}

export const PlaceSidebarActionsSendToMSP = ({ title, location }: PlaceSidebarActionsSendToMSPProps) => {
    const dialog = useDialog()
    const params = new URLSearchParams({
        v: '1',
        lat: String(location.coordinates[1]),
        lng: String(location.coordinates[0]),
        name: title,
        icon: APP_ICON,
    })
    const deepLink = `mysavedplaces://place?${params.toString()}`

    return (
        <button
            type="button"
            className="link flex items-center gap-x-2 align-top text-[#F97316] hover:text-[#FB923C]"
            onClick={() => dialog.open(<SendToMSP deepLink={deepLink} />)}
        >
            <Image src="/images/mysavedplaces/icon.svg" width={24} height={24} alt="" />
            Open in My Saved Places
        </button>
    )
}
