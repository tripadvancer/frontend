'use client'

import { InputHTMLAttributes, Ref } from 'react'

import { CheckIcon } from 'lucide-react'

type FormCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement | null>
    label: string
}

export const FormCheckbox = (props: FormCheckboxProps) => {
    const { ref, label, ...rest } = props

    return (
        <label
            htmlFor={props.id}
            className="group flex cursor-pointer gap-x-2 has-[:disabled]:pointer-events-none has-[:disabled]:opacity-30"
        >
            <div className="flex-center hover-animated h-5 w-5 flex-none rounded border border-black-15 group-hover:border-black-40">
                <input {...rest} ref={ref} type="checkbox" className="peer hidden" />
                <div className="hidden h-4 w-4 peer-checked:block">
                    <CheckIcon size={16} absoluteStrokeWidth />
                </div>
            </div>
            <div className="min-w-0 break-words">{label}</div>
        </label>
    )
}
