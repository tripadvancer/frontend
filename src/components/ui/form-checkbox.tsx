'use client'

import classNames from 'classnames'

import { CheckIcon16 } from './icons'

type FormCheckboxProps = {
    checked: boolean
    isDisabled?: boolean
    onChange: () => void
}

export const FormCheckbox = ({ checked, isDisabled, onChange }: FormCheckboxProps) => {
    return (
        <div
            className={classNames(
                'flex-center hover-animated h-5 w-5 cursor-pointer rounded border border-black-15 text-black-70 hover:border-black-40',
                {
                    'opacity-30': isDisabled,
                },
            )}
            onChange={onChange}
        >
            {checked && <CheckIcon16 />}
        </div>
    )
}
