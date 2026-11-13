'use client'

import TextareaAutosize from 'react-textarea-autosize'

import classNames from 'classnames'

type PlaceFormInputTitleProps = {
    value: string
    error?: string
    onChange: (value: string) => void
}

export const PlaceFormInputTitle = ({ value, error, onChange }: PlaceFormInputTitleProps) => {
    return (
        <TextareaAutosize
            value={value}
            onChange={e => onChange(e.target.value)}
            className={classNames(
                'h1 placeholder:text-black-40 w-full resize-none bg-transparent align-top focus:outline-none',
                { 'text-red-100 placeholder:text-red-100': error },
            )}
            placeholder="Place name..."
        />
    )
}
