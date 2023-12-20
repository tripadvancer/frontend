'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import { ChangeUserEmailInputs } from '@/utils/types/user'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { changeUserEmail } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ChangeEmail = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (values: ChangeUserEmailInputs) => {
        try {
            setIsLoading(true)

            const response = await changeUserEmail(values)

            switch (response.status) {
                case 'OK':
                    dialog.close()
                    router.refresh()
                    toast.success(t('success.change_user_email'))
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ password: t('validation.wrong_password') })
                    break

                case 'FIELD_ERROR':
                    const newEmail = response.formFields.find(formField => formField.id === 'newEmail')
                    if (newEmail) {
                        if (newEmail.error === 'EMAIL_ALREADY_TAKEN') {
                            formik.setErrors({ newEmail: t('validation.email.already_taken') })
                        } else {
                            formik.setErrors({ newEmail: newEmail.error })
                        }
                    }
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            newEmail: '',
            password: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            newEmail: Yup.string().required(t('validation.required')).email(t('validation.email.invalid')),
            password: Yup.string().required(t('validation.required')),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="flex w-full flex-col gap-y-8 sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-h7 sm:text-h7-m">{t('auth.change_email.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">{t('auth.change_email.info')}</p>
                <Input
                    type="text"
                    name="newEmail"
                    value={formik.values.newEmail}
                    placeholder={t('placeholder.action.new_email')}
                    autoFocus
                    error={formik.errors.newEmail}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder={t('placeholder.action.password')}
                    error={formik.errors.password}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
            </div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
                {t('common.action.save_changes')}
            </Button>
        </form>
    )
}
