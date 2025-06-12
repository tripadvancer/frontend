'use client'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormRadio } from '@/components/ui/form-radio'
import { validationConfig } from '@/configs/validation.config'
import { useDialog } from '@/providers/dialog-provider'
import { PlaceComplaintInputs, ReviewComplaintInputs } from '@/redux/services/complain.types'
import { ComplaintReasonsEnum } from '@/utils/enums'

const textMaxLength = validationConfig.complain.maxLength

type ComplainFormProps = {
    initialValues: PlaceComplaintInputs | ReviewComplaintInputs
    isLoading: boolean
    onSubmit: (inputs: PlaceComplaintInputs | ReviewComplaintInputs) => void
}

export const ComplainForm = ({ initialValues, isLoading, onSubmit }: ComplainFormProps) => {
    const t = useTranslations()
    const dialog = useDialog()

    const reasons = Object.values(ComplaintReasonsEnum)

    const validationSchema = Yup.object().shape({
        text: Yup.string()
            .trim()
            .max(textMaxLength, t('validation.text.maxLength', { maxLength: textMaxLength })),
    })

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit,
    })

    return (
        <form className="space-y-8" onSubmit={formik.handleSubmit}>
            <div className="space-y-4">
                <div className="space-y-2">
                    {reasons.map(reason => (
                        <FormRadio
                            key={reason}
                            id={reason}
                            name="reason"
                            value={reason}
                            // @ts-ignore
                            caption={t(`dialog.complaintForm.reasons.${reason.toLowerCase()}`)}
                            checked={formik.values.reason === reason}
                            onChange={formik.handleChange}
                        />
                    ))}
                </div>
                <FormInput
                    type="text"
                    name="text"
                    value={formik.values.text}
                    placeholder={t('dialog.complaintForm.field.comment.placeholder')}
                    error={formik.errors.text}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="space-x-2">
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
