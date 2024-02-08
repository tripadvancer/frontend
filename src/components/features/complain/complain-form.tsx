'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import type { PlaceComplaintInputs, ReviewComplaintInputs } from '@/utils/types/complaint'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormRadio } from '@/components/ui/form-radio'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { ComplaintReasonsEnum, ComplaintReasonsI18nKeys } from '@/utils/enums'
import { useI18n, useScopedI18n } from '@/utils/i18n/i18n.client'

const textMaxLength = validationConfig.complain.maxLength

type ComplainFormProps = {
    initialValues: PlaceComplaintInputs | ReviewComplaintInputs
    isLoading: boolean
    onSubmit: (values: PlaceComplaintInputs | ReviewComplaintInputs) => Promise<void>
}

export const ComplainForm = ({ initialValues, isLoading, onSubmit }: ComplainFormProps) => {
    const t = useI18n()
    const tComplaint = useScopedI18n('complaint.reasons')
    const dialog = useDialog()

    const reasons = Object.values(ComplaintReasonsEnum)

    const validationSchema = Yup.object().shape({
        text: Yup.string().max(textMaxLength, t('validation.text.max_length', { max_length: textMaxLength })),
    })

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit,
    })

    return (
        <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    {reasons.map(reason => (
                        <FormRadio
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
                <FormInput
                    type="text"
                    name="text"
                    value={formik.values.text}
                    placeholder={t('placeholder.action.complain.comment')}
                    error={formik.errors.text}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex gap-x-2">
                <FormButton htmlType="submit" isLoading={isLoading}>
                    {t('common.action.send')}
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    {t('common.action.cancel')}
                </FormButton>
            </div>
        </form>
    )
}
