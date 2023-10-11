import classNames from 'classnames'

type InputProps = {
    type: 'text' | 'password'
    name: string
    value: string
    placeholder: string
    autoFocus?: boolean
    error?: string
    className?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ type, name, value, placeholder, autoFocus, error, className, onChange }: InputProps) => {
    const borderClass = error ? 'border-custom-red-100' : 'border-custom-black-15 focus:border-custom-black-40'

    return (
        <div className={className}>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChange={onChange}
                className={`${borderClass} h-10 w-full rounded-lg border bg-white px-4 text-sm transition-colors duration-300 ease-in-out placeholder:text-custom-black-40 focus:outline-none`}
            />
            {error && <div className="mt-1 text-xs text-custom-red-100">{error}</div>}
        </div>
    )
}
