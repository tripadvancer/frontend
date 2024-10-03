'use client'

import { ChangeEvent } from 'react'

import { useTranslations } from 'next-intl'

import { FormCheckbox } from '@/components/ui/form-checkbox'
import { SettingsCategories } from '@/utils/enums'

type UserSettingsFormPrivacyProps = {
    value: Record<SettingsCategories.PRIVACY, Record<string, boolean>>
    isDisabled: boolean
    onChange: (value: Record<SettingsCategories.PRIVACY, Record<string, boolean>>) => void
}

export const UserSettingsFormPrivacy = ({ value, isDisabled, onChange }: UserSettingsFormPrivacyProps) => {
    const t = useTranslations()

    return (
        <FormCheckbox
            name="show_my_map"
            checked={value[SettingsCategories.PRIVACY].show_my_map}
            label={t('page.user.settingsForm.field.settings.privacy.options.show_my_map')}
            disabled={isDisabled}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChange({
                    ...value,
                    [SettingsCategories.PRIVACY]: {
                        ...value[SettingsCategories.PRIVACY],
                        show_my_map: e.target.checked,
                    },
                })
            }}
        />
    )
}
