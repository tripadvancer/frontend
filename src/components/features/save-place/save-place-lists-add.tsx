'use client'

import { useState } from 'react'

import { FormCheckbox } from '@/components/ui/form-checkbox'
import { FormInput } from '@/components/ui/form-input'
import { useI18n } from '@/utils/i18n/i18n.client'

export const SavePlaceListsAdd = () => {
    const t = useI18n()
    const [isChecked, setIsChecked] = useState(false)

    return (
        <>
            <FormCheckbox
                id="new-list"
                name="new-list"
                value="new-list"
                caption={t('save_place.add_new_list')}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
            />
            <FormInput
                type="text"
                name="text"
                value=""
                placeholder={t('save_place.add_new_list.input.plceholder')}
                error=""
                isDisabled={!isChecked}
                onChange={() => {}}
            />
        </>
    )
}
