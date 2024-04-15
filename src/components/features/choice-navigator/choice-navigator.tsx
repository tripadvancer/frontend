'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { LngLat } from '@/utils/types/geo'

import { FormButton } from '@/components/ui/form-button'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ChoiceNavigator = (lngLat: LngLat) => {
    const t = useI18n()

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">Choose your navigator</h1>
            <div className="flex justify-between">
                <Link
                    href={`https://maps.google.com/maps?q=${lngLat.lat},${lngLat.lng}`}
                    className="aspect-square w-24 cursor-pointer rounded-lg bg-black-15"
                    target="_blank"
                >
                    {/* <Image src={'/images/navigators/google-maps.png'} width={96} height={96} alt="Google maps" /> */}
                </Link>
                <Link
                    href={`https://waze.com/ul?ll=${lngLat.lat},${lngLat.lng}&navigate=yes`}
                    className="aspect-square w-24 cursor-pointer rounded-lg bg-black-15"
                    target="_blank"
                >
                    {/* <Image src={'/images/navigators/google-maps.png'} width={96} height={96} alt="Google maps" /> */}
                </Link>
                <Link
                    href={`https://waze.com/ul?ll=${lngLat.lat},${lngLat.lng}&navigate=yes`}
                    className="aspect-square w-24 cursor-pointer rounded-lg bg-black-15"
                    target="_blank"
                >
                    {/* <Image src={'/images/navigators/google-maps.png'} width={96} height={96} alt="Google maps" /> */}
                </Link>
                <Link
                    href={`http://maps.apple.com/?ll=${lngLat.lat},${lngLat.lng}`}
                    className="aspect-square w-24 cursor-pointer rounded-lg bg-black-15"
                    target="_blank"
                >
                    {/* <Image src={'/images/navigators/google-maps.png'} width={96} height={96} alt="Google maps" /> */}
                </Link>
            </div>
            <FormButton type="stroke" onClick={() => {}}>
                {t('common.action.cancel')}
            </FormButton>
        </div>
    )
}
