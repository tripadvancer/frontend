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
        <div role="status" className="animate-pulse space-y-8">
            <div className="space-y-4">
                <FormRatingInputSkeleton labeled />
                <FormTextareaSkeleton labeled />
                <FormFileInputSkeleton labeled />
            </div>
            <div className="flex items-center gap-x-2">
                <FormSwitcherSkeleton />
                <div className="h-5 w-1/4 rounded-full bg-black-5" />
            </div>
            <div className="space-x-2">
                <FormButtonSkeleton>{t('common.action.send')}</FormButtonSkeleton>
                <FormButtonSkeleton>{t('common.action.close')}</FormButtonSkeleton>
            </div>
        </div>
    )
}
