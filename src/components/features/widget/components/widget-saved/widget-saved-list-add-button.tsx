'use client'

import { FormButton } from '@/components/ui/form-button'
import { PlusIcon16 } from '@/components/ui/icons'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { WidgetSavedListsAdd } from './widget-saved-lists-add'

export const WidgetSavedListAddButton = () => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<WidgetSavedListsAdd />)
    }

    return (
        <FormButton
            type="stroke"
            size="small"
            shape="rounded"
            icon={<PlusIcon16 />}
            className="mb-6 w-full sm:mb-8"
            onClick={handleClick}
        >
            {t('widget.saved.lists.add_button')}
        </FormButton>
    )
}
