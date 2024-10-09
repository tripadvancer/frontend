'use client'

import { ChangeEvent } from 'react'

import { useTranslations } from 'next-intl'

import { FormCheckbox } from '@/components/ui/form-checkbox'
import { SettingsCategories } from '@/utils/enums'

type UserSettingsFormPrivacyProps = {
    initialValue: Record<SettingsCategories.PRIVACY, Record<string, boolean>>
    isDisabled: boolean
    onChange: (value: Record<SettingsCategories.PRIVACY, Record<string, boolean>>) => void
}

export const UserSettingsFormPrivacy = ({ initialValue, isDisabled, onChange }: UserSettingsFormPrivacyProps) => {
    const t = useTranslations()

    return (
        <FormCheckbox
            name="show_my_map"
            checked={initialValue[SettingsCategories.PRIVACY].show_my_map}
            label={t('page.user.settingsForm.field.settings.privacy.options.show_my_map')}
            disabled={isDisabled}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChange({
                    ...initialValue,
                    [SettingsCategories.PRIVACY]: {
                        ...initialValue[SettingsCategories.PRIVACY],
                        show_my_map: e.target.checked,
                    },
                })
            }}
        />
    )
}
