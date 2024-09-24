import { useTranslations } from 'next-intl'

import { FormCheckbox } from '@/components/ui/form-checkbox'

export const UserSettingsPrivacy = async () => {
    const t = useTranslations()

    return (
        <div>
            <FormCheckbox label={t('page.user.settingsForm.privacy.field.showVisitedMap.label')} />
        </div>
    )
}
