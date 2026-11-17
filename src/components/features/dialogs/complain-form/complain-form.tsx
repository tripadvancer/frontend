'use client'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useDialog } from '@/components/providers/dialog-provider'
import { useAppSettings } from '@/components/providers/settings-provider'
import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { FormRadio } from '@/components/ui/form-radio'
import { ComplaintReasonsEnum } from '@/utils/enums'
import { PlaceComplaintInputs, ReviewComplaintInputs } from '@/utils/redux/services/complain/complain.types'

const complaintReasonLabels: Record<ComplaintReasonsEnum, string> = {
    [ComplaintReasonsEnum.ABUSE]: 'Misuse, mistreatment or intentional harm',
    [ComplaintReasonsEnum.COPYRIGHT]: 'Copyright or intellectual property rights violation',
    [ComplaintReasonsEnum.DUPLICATE]: 'Duplicate, no additional value',
    [ComplaintReasonsEnum.FALSE]: 'Incorrect or misleading information',
    [ComplaintReasonsEnum.FRAUD]: 'Fraudulent, deceptive activities',
    [ComplaintReasonsEnum.INAPPROPRIATE]: 'Inappropriate or explicit content',
    [ComplaintReasonsEnum.SPAM]: 'Irrelevant or unsolicited content',
    [ComplaintReasonsEnum.OTHER]: 'Other reason',
}

type ComplainFormProps = {
    initialValues: PlaceComplaintInputs | ReviewComplaintInputs
    isLoading: boolean
    onSubmit: (inputs: PlaceComplaintInputs | ReviewComplaintInputs) => void
}

export const ComplainForm = ({ initialValues, isLoading, onSubmit }: ComplainFormProps) => {
    const settings = useAppSettings()
    const dialog = useDialog()
    const textMaxLength = settings?.validation.complaint.maxLength ?? 0

    const reasons = Object.values(ComplaintReasonsEnum)

    const validationSchema = Yup.object().shape({
        text: Yup.string().trim().max(textMaxLength, `This field must be at most ${textMaxLength} characters long`),
    })

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: settings ? validationSchema : Yup.object(),
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
                            caption={complaintReasonLabels[reason]}
                            checked={formik.values.reason === reason}
                            onChange={formik.handleChange}
                        />
                    ))}
                </div>
                <FormInput
                    type="text"
                    name="text"
                    value={formik.values.text}
                    placeholder="Add your comment here"
                    maxLength={textMaxLength}
                    error={formik.errors.text}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="flex gap-x-2">
                <FormButton htmlType="submit" isLoading={isLoading} isDisabled={!settings}>
                    Send
                </FormButton>
                <FormButton type="stroke" onClick={() => dialog.close()}>
                    Cancel
                </FormButton>
            </div>
        </form>
    )
}
