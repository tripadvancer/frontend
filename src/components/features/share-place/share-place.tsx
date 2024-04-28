'use client'

import { FacebookShareButton, TwitterShareButton } from 'react-share'

import { useCopyToClipboard } from 'usehooks-ts'

import type { IPlace } from '@/utils/types/place'

import { FormButton } from '@/components/ui/form-button'
import { CopyIcon24, FacebookIcon24, TwitterIcon24 } from '@/components/ui/icons'
import { useToast } from '@/providers/toast-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const SharePlace = (place: IPlace) => {
    const t = useI18n()
    const toast = useToast()
    const url = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/places/${place.id}`

    const [copiedText, copy] = useCopyToClipboard()

    const handleCopy = () => {
        copy(url)
            .then(() => {
                toast.success(t('share_place.copy.success'))
            })
            .catch(error => {
                toast.error(t('common.error'))
            })
    }

    return (
        <div className="flex w-full flex-col gap-y-8 sm:w-104">
            <h1 className="h7 text-center">{t('share_place.title')}</h1>
            <p className="text-center">{t('share_place.text')}</p>
            <div className="flex gap-x-2">
                <TwitterShareButton
                    url={url}
                    className="hover-animated flex h-10 w-10 items-center justify-center rounded-lg !bg-blue-100 !text-white hover:!bg-blue-active"
                >
                    <TwitterIcon24 />
                </TwitterShareButton>

                <FacebookShareButton
                    url={url}
                    className="hover-animated flex h-10 w-10 items-center justify-center rounded-lg !bg-blue-100 !text-white hover:!bg-blue-active"
                >
                    <FacebookIcon24 />
                </FacebookShareButton>

                <div className="flex h-10 flex-1 items-center rounded-lg border border-black-15 px-4">{url}</div>

                <FormButton type="stroke" icon={<CopyIcon24 />} onClick={handleCopy} />
            </div>
        </div>
    )
}
