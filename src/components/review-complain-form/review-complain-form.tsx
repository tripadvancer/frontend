'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { ReviewComplaintInputs } from '@/utils/types/review'

import { ButtonStroke } from '@/components/button-stroke'
import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { Radio } from '@/components/radio'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { reviewComplaint } from '@/services/reviews'
import { ComplaintReasonsEnum, ComplaintReasonsI18nKeys } from '@/utils/enums'
import { useI18n, useScopedI18n } from '@/utils/i18n/i18n.client'

const textMaxLength = validationConfig.complain.maxLength

type ReviewComplainFormProps = {
    reviewId: number
}

export const ReviewComplainForm = ({ reviewId }: ReviewComplainFormProps) => {
    const t = useI18n()
    const tComplaint = useScopedI18n('complaint.reasons')
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const reasons = Object.values(ComplaintReasonsEnum)

    const handleSubmit = async (values: ReviewComplaintInputs) => {
        try {
            setIsLoading(true)
            reviewComplaint(values)
            toast.success(t('review.complaint.form.success'))
            dialog.close()
        } catch (err) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            reviewId,
            reason: ComplaintReasonsEnum.ABUSE,
            text: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            text: Yup.string().max(textMaxLength, t('forms.validation.max_length', { max_length: textMaxLength })),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="w-full sm:w-104" onSubmit={formik.handleSubmit}>
            <div className="mb-8 flex flex-col gap-y-4">
                <h1 className="text-h7">{t('review.complaint.form.title')}</h1>
                <hr className="border-black-70" />
                <div className="flex flex-col gap-y-2">
                    {reasons.map(reason => (
                        <Radio
                            key={reason}
                            id={reason}
                            name="reason"
                            value={reason}
                            caption={tComplaint(ComplaintReasonsI18nKeys[reason])}
                            checked={formik.values.reason === reason}
                            onChange={formik.handleChange}
                        />
                    ))}
                </div>
                <Input
                    type="text"
                    name="text"
                    value={formik.values.text}
                    placeholder={t('review.complaint.form.text.placeholder')}
                    error={formik.errors.text}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex gap-x-2">
                <Button type="submit" isLoading={isLoading}>
                    {t('common.cta.send')}
                </Button>
                <ButtonStroke onClick={() => dialog.close()}>{t('common.cta.cancel')}</ButtonStroke>
            </div>
        </form>
    )
}
