import { InputHTMLAttributes, Ref } from 'react'

type FormRadioProps = InputHTMLAttributes<HTMLInputElement> & {
    ref?: Ref<HTMLInputElement | null>
    caption: string
}

export const FormRadio = (props: FormRadioProps) => {
    const { ref, caption, ...rest } = props

    return (
        <label htmlFor={props.id} className="group flex cursor-pointer gap-x-2">
            <div className="flex-center hover-animated h-5 w-5 flex-none rounded-full border border-black-15 group-hover:border-black-40">
                <input {...rest} ref={ref} type="radio" className="peer hidden" />
                <div className="hidden h-2 w-2 rounded-full bg-black-70 peer-checked:block" />
            </div>

            {caption}
        </label>
    )
}
