'use client'

import { FormInput } from '@/components/ui/form-input'
import { useI18n } from '@/utils/i18n/i18n.client'

export const LocationPickerSearch = () => {
    const t = useI18n()

    return <FormInput type="text" name="" value="" placeholder={t('location_picker.placeholder')} onChange={() => {}} />
}
