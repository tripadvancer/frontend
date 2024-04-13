'use client'

import { useDialog } from '@/providers/dialog-provider'
import { useI18n } from '@/utils/i18n/i18n.client'

import { SelectCoordinates } from '../../select-coordinates/select-coordinates'

type PlaceFormInputCoordinatesProps = {
    value: string
    onChange: (value: string | null) => void
}

export const PlaceFormInputCoordinates = ({ value, onChange }: PlaceFormInputCoordinatesProps) => {
    const t = useI18n()
    const dialog = useDialog()

    const handleClick = () => {
        dialog.open(<SelectCoordinates />)
    }

    return (
        <div
            className="hover-animated w-full cursor-pointer text-center text-big text-white hover:text-blue-active"
            onClick={handleClick}
        >
            {value || t('placeholder.place.coordinates')}
        </div>
    )

    // return (
    //     <input
    //         type="text"
    //         value={value}
    //         onChange={e => onChange(e.target.value)}
    //         className="w-full bg-transparent text-center text-big text-white placeholder:text-white focus:outline-none"
    //         placeholder={t('placeholder.place.coordinates')}
    //     />
    // )
}
