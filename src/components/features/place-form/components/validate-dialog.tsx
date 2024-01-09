'use client'

import { FormButton } from '@/components/ui/form-button'
import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

export const ValidateDialog = () => {
    const t = useI18n()
    const dialog = useDialog()

    return (
        <div className="w-full sm:w-104">
            <div className="mb-8 flex flex-col gap-y-4">
                <h1 className="text-h7">Warning</h1>
                <hr className="border-black-70" />
                <p>To add a place to the map, please correct the following errors:</p>
                <ul className="list-outside list-disc space-y-2.5 pl-12">
                    <li>
                        Please enter the title of the place. Please enter the title of the place. Please enter the title
                        of the place.
                    </li>
                    <li>Please enter the description of the place.</li>
                    <li>Please enter the location of the place.</li>
                </ul>
            </div>
            <FormButton variant="blue" onClick={() => {}}>
                {t('common.action.close')}
            </FormButton>
        </div>
    )
}
