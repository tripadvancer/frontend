'use client'

import { useFormik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'

import { FormButton } from '@/components/ui/form-button'
import { FormInput } from '@/components/ui/form-input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { userAPI } from '@/redux/services/user.api'
import { ChangeUserEmailInputs } from '@/redux/services/user.types'

import { ChangeEmailCompleting } from './change-email-completing'

export const ChangeEmail = () => {
    const t = useTranslations()
    const dialog = useDialog()
    const toast = useToast()

    const [changeUserEmail, { isLoading }] = userAPI.useChangeUserEmailMutation()

    const initialValues = {
        newEmail: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({
        newEmail: Yup.string()
            .trim()
            .required(t('validation.required'))
            .matches(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
                t('validation.email.invalid'),
            ),
        password: Yup.string().required(t('validation.required')),
    })

    const handleSubmit = async (inputs: ChangeUserEmailInputs) => {
        try {
            const trimedInputs = {
                ...inputs,
                newEmail: inputs.newEmail.trim(),
            }
            const response = await changeUserEmail(trimedInputs).unwrap()

            switch (response.status) {
                case 'OK':
                    dialog.open(<ChangeEmailCompleting />)
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: t('validation.wrong.password') })
                    break

                case 'EMAIL_ALREADY_EXISTS_ERROR':
                    formik.setErrors({ newEmail: t('validation.wrong.emailTaken') })
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err) {
            toast.error(t('common.error'))
        }
    }

    const formik = useFormik({
        initialValues,
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema,
        onSubmit: handleSubmit,
    })

    return (
        <form className="space-y-8 sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="h7 text-center">{t('auth.changeEmail.title')}</h1>
            <div className="space-y-2">
                <p className="text-center">{t('auth.changeEmail.text')}</p>
                <FormInput
                    type="text"
                    name="newEmail"
                    value={formik.values.newEmail}
                    placeholder={t('placeholder.action.enterNewEmail')}
                    autoFocus
                    error={formik.errors.newEmail}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
                <FormInput
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder={t('placeholder.action.enterPassword')}
                    error={formik.errors.password}
                    disabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <FormButton htmlType="submit" className="w-full" isLoading={isLoading} isDisabled={!formik.dirty}>
                {t('common.action.saveChanges')}
            </FormButton>
        </form>
    )
}
