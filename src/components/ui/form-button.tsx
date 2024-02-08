import classNames from 'classnames'

type FormButtonProps = {
    children?: React.ReactNode
    icon?: React.ReactNode
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
                    <svg
                        width={size === 'small' ? 16 : 24}
                        height={size === 'small' ? 16 : 24}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-spin"
                    >
                        <path d="M18.364 5.63604L19.7782 4.22182C21.7688 6.21243 23 8.96243 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 6.26196 5.3935 1.55007 11 1.04484V1H13V11L14.1213 9.87868C14.6642 10.4216 15 11.1716 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.6938 9.83481 9.58254 11 9.17071V7.10002C8.71776 7.56329 7 9.58104 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 10.6193 16.4404 9.36929 15.5355 8.46447L16.9497 7.05025C18.2165 8.317 19 10.067 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.47353 7.60771 5.55612 11 5.07089V3.05493C6.50005 3.55237 3 7.36745 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 9.51472 19.9926 7.26472 18.364 5.63604Z" />
                    </svg>
                </span>
            )}
            <span className={classNames('flex-center gap-x-2', { 'opacity-0': isLoading })}>
                {icon}
                {children}
            </span>
        </button>
    )
}
