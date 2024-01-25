import { ChangeEvent } from 'react'

type FormRadioProps = {
    id: string
    name: string
    value: string
    caption: string
    checked?: boolean
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const FormRadio = ({ id, name, value, caption, checked, onChange }: FormRadioProps) => {
    return (
        <div className="flex">
            <label htmlFor={id} className="group flex cursor-pointer justify-center gap-x-2">
                <div className="hover-animated flex-center h-5 w-5 flex-none rounded-full border border-black-15 group-hover:border-black-40">
                    <input
                        id={id}
                        type="radio"
                        name={name}
                        value={value}
                        checked={checked}
                        onChange={onChange}
                        className="peer hidden"
                    />
                    <div className="hidden h-2 w-2 rounded-full bg-black-70 peer-checked:block" />
                </div>
                {caption}
            </label>
        </div>
    )
}
