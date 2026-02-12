'use client'

import { PlusIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ListAdd } from '@/components/features/dialogs/list-form/list-add'
import { useDialog } from '@/components/providers/dialog-provider'
import { FormButton } from '@/components/ui/form-button'

export const WidgetSavedListAddButton = () => {
    const t = useTranslations()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<ListAdd />)
    }

    return (
        <FormButton
            type="stroke"
            size="small"
            shape="rounded"
            icon={<PlusIcon size={16} />}
            className="mb-6 w-full sm:mb-8"
            onClick={handleClick}
        >
            {t('map.widget.tabs.savedPlaces.lists.addButton')}
        </FormButton>
    )
}
