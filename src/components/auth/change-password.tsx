'use client'

import { useState } from 'react'

import { useFormik } from 'formik'
import Session from 'supertokens-web-js/recipe/session'
import * as Yup from 'yup'

import { useRouter } from 'next/navigation'

import type { ChangeUserPasswordInputs } from '@/utils/types/user'

import { Button } from '@/components/forms/button/button'
import { Input } from '@/components/forms/input/input'
import { useDialog } from '@/providers/dialog-provider'
import { useToast } from '@/providers/toast-provider'
import { changeUserPassword } from '@/services/user'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ChangePassword = () => {
    const t = useI18n()
    const router = useRouter()
    const dialog = useDialog()
    const toast = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (values: ChangeUserPasswordInputs) => {
        try {
            setIsLoading(true)

            const response = await changeUserPassword(values)

            switch (response.status) {
                case 'OK':
                    await Session.signOut()
                    dialog.close()
                    router.push('/')
                    router.refresh()
                    break

                case 'FIELD_ERROR':
                    const newPassword = response.formFields.find(formField => formField.id === 'newPassword')
                    if (newPassword) {
                        formik.setErrors({ newPassword: newPassword.error })
                    }
                    break

                case 'WRONG_CREDENTIALS_ERROR':
                    formik.setErrors({ oldPassword: t('validation.wrong_password') })
                    break

                default:
                    toast.error(t('common.error'))
                    break
            }
        } catch (err: any) {
            toast.error(t('common.error'))
        } finally {
            setIsLoading(false)
        }
    }

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string().required(t('validation.required')),
            newPassword: Yup.string().required(t('validation.required')),
        }),
        onSubmit: handleSubmit,
    })

    return (
        <form className="flex w-full flex-col gap-y-8 sm:w-104" onSubmit={formik.handleSubmit}>
            <h1 className="text-center text-h7 sm:text-h7-m">{t('auth.change_password.title')}</h1>
            <div className="flex flex-col gap-y-2">
                <p className="text-center">{t('auth.change_password.info')}</p>
                <Input
                    type="password"
                    name="oldPassword"
                    value={formik.values.oldPassword}
                    placeholder={t('auth.change_password.forms.fields.old_password.placeholder')}
                    autoFocus
                    error={formik.errors.oldPassword}
                    isDisabled={isLoading}
                    onChange={formik.handleChange}
                />
                <Input
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    placeholder={t('auth.change_password.forms.fields.new_password.placeholder')}
                    error={formik.errors.newPassword}
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
