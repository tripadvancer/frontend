import { ReactNode } from 'react'

import classNames from 'classnames'

import { Spinner } from '@/components/ui/spinner'

type FormButtonProps = {
    children?: ReactNode
    icon?: ReactNode
    size?: 'small' | 'medium'
    type?: 'primary' | 'stroke'
    variant?: 'blue' | 'orange' | 'red' | 'light-blue'
    shape?: 'default' | 'rounded' | 'circle'
    htmlType?: 'button' | 'submit'
    className?: string
    isLoading?: boolean
    isDisabled?: boolean
    onClick?: () => void
}

export const FormButton = ({
    children,
    icon,
    size = 'medium',
    type = 'primary',
    variant = 'blue',
    shape = 'default',
    htmlType = 'button',
    className,
    isLoading,
    isDisabled,
    onClick,
}: FormButtonProps) => {
    return (
        <button
            type={htmlType}
            // prettier-ignore
            className={classNames(
                'hover-animated relative whitespace-nowrap font-medium focus:outline-none disabled:cursor-no-drop',
                // Sizes
                {
                    'h-10 px-6': size === 'medium' && shape !== 'circle' && !!children,
                    'h-8  px-6': size === 'small'  && shape !== 'circle' && !!children,

                    'h-10 w-10': (size === 'medium' && shape === 'circle') || (size === 'medium' && !children),
                    'h-8  w-8' : (size === 'small'  && shape === 'circle') || (size === 'small' && !children),

                    'text-small': size === 'small',
                },
                // Types
                {
                    // Primary
                    'text-white    bg-blue-100   enabled:hover:bg-blue-active'  : type === 'primary' && variant === 'blue',
                    'text-white    bg-orange-100 enabled:hover:bg-orange-active': type === 'primary' && variant === 'orange',
                    'text-white    bg-red-100    enabled:hover:bg-red-active'   : type === 'primary' && variant === 'red',
                    
                    'text-blue-100 bg-blue-20 enabled:hover:bg-blue-active enabled:hover:text-white': type === 'primary' && variant === 'light-blue',

                    // Stroke
                    'border border-blue-20   text-blue-100   enabled:hover:border-blue-active   enabled:hover:text-blue-active'  : type === 'stroke' && variant === 'blue',
                    'border border-orange-20 text-orange-100 enabled:hover:border-orange-active enabled:hover:text-orange-active': type === 'stroke' && variant === 'orange',
                    'border border-red-20    text-red-100    enabled:hover:border-red-active    enabled:hover:text-red-active'   : type === 'stroke' && variant === 'red',
                },
                // Shapes
                {
                    'rounded-lg'  : shape === 'default',
                    'rounded-full': shape === 'rounded' || shape === 'circle',
                },
                // States
                {
                    'bg-blue-active'  : isLoading && type === 'primary' && variant === 'blue',
                    'bg-orange-active': isLoading && type === 'primary' && variant === 'orange',
                    'bg-red-active'   : isLoading && type === 'primary' && variant === 'red',

                    'bg-blue-active text-white': isLoading && type === 'primary' && variant === 'light-blue',

                    'border-blue-active'  : isLoading && type === 'stroke' && variant === 'blue',
                    'border-orange-active': isLoading && type === 'stroke' && variant === 'orange',
                    'border-red-active'   : isLoading && type === 'stroke' && variant === 'red',

                    'opacity-30': isDisabled,
                },
                className,
            )}
            disabled={isDisabled || isLoading}
            onClick={onClick}
        >
            {isLoading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spinner size={size === 'small' ? 16 : 24} />
                </span>
            )}
            <span className={classNames('flex-center gap-x-2', { 'opacity-0': isLoading })}>
                {icon}
                {children}
            </span>
        </button>
    )
}
