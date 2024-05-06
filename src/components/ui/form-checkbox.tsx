'use client'

import { ChangeEvent } from 'react'

import { CheckIcon16 } from '@/components/ui/icons'

type FormCheckboxProps = {
    id: string
    name: string
    value: string | number
    caption: string
    checked?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const FormCheckbox = ({ id, name, value, caption, checked, onChange }: FormCheckboxProps) => {
    return (
        <label htmlFor={id} className="group flex cursor-pointer gap-x-2">
            <div className="flex-center hover-animated h-5 w-5 flex-none rounded border border-black-15 group-hover:border-black-40">
                <input
                    id={id}
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="peer hidden"
                />
                <div className="hidden h-4 w-4 peer-checked:block">
                    <CheckIcon16 />
                </div>
            </div>
            {caption}
        </label>
    )
}
