'use client'

import { FormButton } from '@/components/ui/form-button'
import { MapIcon16, PinIcon16 } from '@/components/ui/icons'
import { useI18n } from '@/utils/i18n/i18n.client'

type MapsContainerTogglerProps = {
    isToggle: boolean
    onClick: () => void
}

export const MapsContainerToggler = ({ isToggle, onClick }: MapsContainerTogglerProps) => {
    const t = useI18n()

    return (
        <div className="!fixed bottom-12 left-1/2 z-40 -translate-x-1/2 transform">
            <FormButton shape="rounded" icon={isToggle ? <MapIcon16 /> : <PinIcon16 />} onClick={onClick}>
                {isToggle ? t('widget.toggler.map') : t('widget.toggler.search_and_filters')}
            </FormButton>
        </div>
    )
}
