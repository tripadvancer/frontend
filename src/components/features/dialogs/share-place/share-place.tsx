'use client'

import { FacebookShareButton, XShareButton } from 'react-share'

import { CopyIcon } from 'lucide-react'
import { useCopyToClipboard } from 'usehooks-ts'

import Image from 'next/image'

import { useToast } from '@/components/providers/toast-provider'
import { FormButton } from '@/components/ui/form-button'
import { getCountryByCode } from '@/services/countries'

type SharePlaceProps = {
    id: number
    title: string
    countryCode: string | null
}

export const SharePlace = ({ id, title, countryCode }: SharePlaceProps) => {
    const toast = useToast()
    const url = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/places/${id}`

    const [_, copy] = useCopyToClipboard()

    const handleCopy = () => {
        copy(url)
            .then(() => {
                toast.success('Link copied to clipboard')
            })
            .catch(error => {
                toast.error('An unexpected error has occurred. Please try again later.')
            })
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">Share place</h1>
            <p className="text-center">Share the place with your friends and invite them to visit it.</p>
            <div className="flex gap-x-2">
                <XShareButton
                    url={url}
                    text="Look what place I found on Tripadvancer!"
                    via="tripadvancer_me"
                    hashtags={[
                        `${title.replace(/\s/g, '').toLowerCase()}`,
                        `${getCountryByCode(countryCode)?.name.replace(/\s/g, '').toLowerCase()}`,
                        `visit${getCountryByCode(countryCode)?.name.replace(/\s/g, '').toLowerCase()}`,
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
                    className="hover-animated hover:!bg-blue-active flex h-10 w-10 flex-none items-center justify-center rounded-lg !bg-blue-100 !text-white"
                >
                    <Image src="/images/icons/social/x.svg" width={24} height={24} alt="X" />
                </XShareButton>

                <FacebookShareButton
                    url={url}
                    className="hover-animated hover:!bg-blue-active flex h-10 w-10 flex-none items-center justify-center rounded-lg !bg-blue-100 !text-white"
                >
                    <Image src="/images/icons/social/facebook.svg" width={24} height={24} alt="Facebook" />
                </FacebookShareButton>

                <div className="border-black-15 flex h-10 min-w-0 flex-1 items-center rounded-lg border px-4">
                    <div className="overflow-hidden text-ellipsis">{url}</div>
                </div>

                <FormButton type="stroke" icon={<CopyIcon size={20} />} className="flex-none" onClick={handleCopy} />
            </div>
        </div>
    )
}
