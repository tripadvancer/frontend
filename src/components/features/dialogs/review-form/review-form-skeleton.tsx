'use client'

import { useTranslations } from 'next-intl'

import { FormButtonSkeleton } from '@/components/ui/form-button-skeleton'
import { FormFileInputSkeleton } from '@/components/ui/form-file-input-skeleton'
import { FormRatingInputSkeleton } from '@/components/ui/form-rating-input-skeleton'
import { FormSwitcherSkeleton } from '@/components/ui/form-switcher-skeleton'
import { FormTextareaSkeleton } from '@/components/ui/form-textarea-skeleton'

export const ReviewFormSkeleton = () => {
    const t = useTranslations()

    return (
        <div role="status" className="flex animate-pulse flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.reviewForm.field.rating.label')}
                    </label>
                    <FormRatingInputSkeleton />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.reviewForm.field.text.label')}
                    </label>
                    <FormTextareaSkeleton />
                </div>
                <div className="flex flex-col gap-y-2">
                    <label htmlFor="text" className="font-medium">
                        {t('dialog.reviewForm.field.photos.label')}
                    </label>
                    <FormFileInputSkeleton />
                </div>

                <div className="flex items-center gap-x-2">
                    <FormSwitcherSkeleton />
                    <div className="text-black-40">{t('common.action.place.iWasHere')}</div>
                </div>
            </div>
            <div className="flex gap-x-2">
                <FormButtonSkeleton>{t('common.action.send')}</FormButtonSkeleton>
                <FormButtonSkeleton>{t('common.action.close')}</FormButtonSkeleton>
            </div>
        </div>
    )
}
