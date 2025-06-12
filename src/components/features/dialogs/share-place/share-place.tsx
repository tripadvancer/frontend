'use client'

import { FacebookShareButton, TwitterShareButton } from 'react-share'

import { CopyIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useCopyToClipboard } from 'usehooks-ts'

import Image from 'next/image'

import { FormButton } from '@/components/ui/form-button'
import { useToast } from '@/providers/toast-provider'
import { getCountryByCode } from '@/services/countries'

type SharePlaceProps = {
    id: number
    title: string
    countryCode: string | null
}

export const SharePlace = ({ id, title, countryCode }: SharePlaceProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const toast = useToast()
    const url = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/places/${id}`

    const [_, copy] = useCopyToClipboard()

    const handleCopy = () => {
        copy(url)
            .then(() => {
                toast.success(t('success.copyLink'))
            })
            .catch(error => {
                toast.error(t('common.error'))
            })
    }

    return (
        <div className="space-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('dialog.sharePlace.title')}</h1>
            <p className="text-center">{t('dialog.sharePlace.text')}</p>
            <div className="space-x-2">
                <TwitterShareButton
                    url={url}
                    title="Look what place I found on Tripadvancer!"
                    via="tripadvancer_me"
                    hashtags={[
                        `${title.replace(/\s/g, '').toLowerCase()}`,
                        `${getCountryByCode(countryCode)?.name[locale].replace(/\s/g, '').toLowerCase()}`,
                        `visit${getCountryByCode(countryCode)?.name[locale].replace(/\s/g, '').toLowerCase()}`,
                        'tripadvancer_me',
                        'tripadvancer',
                        'travel',
                        'trip',
                        'tripplanner',
                        'vacation',
                        'holiday',
                        'points_of_interest',
                        'places_to_visit',
                    ]}
                    className="hover-animated flex h-10 w-10 flex-none items-center justify-center rounded-lg !bg-blue-100 !text-white hover:!bg-blue-active"
                >
                    <Image src="/images/icons/social/x.svg" width={24} height={24} alt="Twitter" />
                </TwitterShareButton>

                <FacebookShareButton
                    url={url}
                    className="hover-animated flex h-10 w-10 flex-none items-center justify-center rounded-lg !bg-blue-100 !text-white hover:!bg-blue-active"
                >
                    <Image src="/images/icons/social/facebook.svg" width={24} height={24} alt="Facebook" />
                </FacebookShareButton>

                <div className="flex h-10 min-w-0 flex-1 items-center rounded-lg border border-black-15 px-4">
                    <div className="overflow-hidden text-ellipsis">{url}</div>
                </div>

                <FormButton type="stroke" icon={<CopyIcon size={20} />} className="flex-none" onClick={handleCopy} />
            </div>
        </div>
    )
}
