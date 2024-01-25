import { useEffect } from 'react'

import { useDialog } from '@/providers/dialog-provider'

import { FormSelectCategories } from './form-select-categories'

type FormInputCoordinatesProps = {
    value: number[]
    onChange: (value: number[]) => void
}

export const FormInputCategories = ({ value, onChange }: FormInputCoordinatesProps) => {
    const dialog = useDialog()

    const handleSelectCategories = () => {
        dialog.open(<FormSelectCategories selectedCategoryIds={value} setSelectedCategoryIds={onChange} />)
    }

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <div className="flex gap-2">
            <div
                className="hover-animated flex h-8 cursor-pointer items-center gap-x-2 rounded-full border border-white px-4 text-small text-white hover:border-blue-active hover:text-blue-active"
                onClick={handleSelectCategories}
            >
                {/* prettier-ignore */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.01005 8.98995H2L2 7.01005H7.01005V2H8.98995V7.01005H14L14 8.98995H8.98995V14H7.01005V8.98995Z" />
                </svg>
                Category
            </div>
            {/* <div className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white">
                Категория 2
            </div>
            <div className="flex h-8 items-center rounded-full border border-white px-4 text-small text-white">
                Категория 3
            </div> */}
        </div>
    )
}
