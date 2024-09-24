'use client'

import { InputHTMLAttributes, Ref, forwardRef } from 'react'

import { CheckIcon16 } from '@/components/ui/icons'

type FormCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
}

const FormCheckboxComponent = (props: FormCheckboxProps, ref: Ref<HTMLInputElement>) => {
    return (
        <label
            htmlFor={props.id}
            className="group flex cursor-pointer gap-x-2 has-[:disabled]:pointer-events-none has-[:disabled]:opacity-30"
        >
            <div className="flex-center hover-animated h-5 w-5 flex-none rounded border border-black-15 group-hover:border-black-40">
                <input {...props} ref={ref} type="checkbox" className="peer hidden" />
                <div className="hidden h-4 w-4 peer-checked:block">
                    <CheckIcon16 />
                </div>
            </div>
            <div className="min-w-0 break-words">{props.label}</div>
        </label>
    )
}

export const FormCheckbox = forwardRef(FormCheckboxComponent)
