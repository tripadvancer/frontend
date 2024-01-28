'use client'

type FormInputTitleProps = {
    value: string
    onChange: (value: string) => void
}

export const FormInputTitle = ({ value, onChange }: FormInputTitleProps) => {
    return <div className="text-center text-h1-m text-white sm:text-h1">Place name</div>
}
