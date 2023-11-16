'use client'

import { IReview } from '@/utils/types/review'

import { useI18n } from '@/utils/i18n/i18n.client'
import { getI18n } from '@/utils/i18n/i18n.server'

import { ReviewForm } from './review-form'

type EditReviewProps = IReview

export const EditReview = (review: EditReviewProps) => {
    const t = useI18n()

    return (
        <div className="w-full sm:w-104">
            <div className="flex flex-col gap-y-4">
                <h1 className="text-h7">{t('review.edit.form.title')}</h1>
                <hr className="border-black-70" />
                <ReviewForm {...review} />
            </div>
        </div>
    )
}
