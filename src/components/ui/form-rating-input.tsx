'use client'

import classNames from 'classnames'
import { StarIcon } from 'lucide-react'

type FormRatingInputProps = {
    value: number
    error?: string
    className?: string
    isDisabled?: boolean
    onChange: (value: number) => void
}

export const FormRatingInput = ({ value, error, className, isDisabled, onChange }: FormRatingInputProps) => {
    const handleClick = (selectedValue: number) => {
        onChange(selectedValue !== value ? selectedValue : 0)
    }

    return (
        <div className={className}>
            <div
                className={classNames('group inline-flex text-orange-100', {
                    'opacity-30': isDisabled,
                })}
            >
                {Array(5)
                    .fill(null)
                    .map((_, index) => (
                        <div
                            key={`rating-star-${index}`}
                            className={classNames('peer transition-opacity duration-300 ease-in-out', {
                                'opacity-30': Math.round(value) < index + 1,
                                'cursor-pointer group-hover:opacity-100 peer-hover:opacity-30': !isDisabled,
                                'pointer-events-none': isDisabled,
                            })}
                            onClick={() => handleClick(index + 1)}
                        >
                            <StarIcon size={32} fill="currentColor" />
                        </div>
                    ))}
            </div>

            {error && <div className="mt-2 text-small text-red-100">{error}</div>}
        </div>
    )
}
