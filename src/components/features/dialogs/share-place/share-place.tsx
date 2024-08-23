'use client'

import { FacebookShareButton, TwitterShareButton } from 'react-share'

import { useLocale, useTranslations } from 'next-intl'
import { useCopyToClipboard } from 'usehooks-ts'

import type { IPlace, IPlacePreview } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { CopyIcon24, FacebookIcon24, TwitterIcon24 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { getCountryByCode } from '@/services/countries'

export const SharePlace = (place: IPlace | IPlacePreview) => {
    const t = useTranslations()
    const locale = useLocale()
    const toast = useToast()
    const url = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/places/${place.id}`

    const [copiedText, copy] = useCopyToClipboard()

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
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('dialog.sharePlace.title')}</h1>
            <p className="text-center">{t('dialog.sharePlace.text')}</p>
            <div className="flex gap-x-2">
                <TwitterShareButton
                    url={url}
                    title="Look what place I found on Tripadvancer!"
                    via="tripadvancer_me"
                    hashtags={[
                        `${place.title.replace(/\s/g, '').toLowerCase()}`,
                        `${getCountryByCode(place.countryCode)?.name[locale].replace(/\s/g, '').toLowerCase()}`,
                        `visit${getCountryByCode(place.countryCode)?.name[locale].replace(/\s/g, '').toLowerCase()}`,
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
                    <TwitterIcon24 />
                </TwitterShareButton>

                <FacebookShareButton
                    url={url}
                    className="hover-animated flex h-10 w-10 flex-none items-center justify-center rounded-lg !bg-blue-100 !text-white hover:!bg-blue-active"
                >
                    <FacebookIcon24 />
                </FacebookShareButton>

                <div className="flex h-10 min-w-0 flex-1 items-center rounded-lg border border-black-15 px-4">
                    <div className="overflow-hidden text-ellipsis">{url}</div>
                </div>

                <FormButton type="stroke" icon={<CopyIcon24 />} className="flex-none" onClick={handleCopy} />
            </div>
        </div>
    )
}
