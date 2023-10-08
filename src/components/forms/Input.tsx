type InputProps = {
    type: 'text' | 'password'
    name: string
    placeholder: string
    className?: string
}

export const Input = ({ type, name, placeholder, className }: InputProps) => {
    return (
        <input
            type={type}
            name={name}
            className={`${className} h-10 w-full rounded-lg border border-custom-black-15 bg-white px-4 text-sm transition-colors duration-300 ease-in-out placeholder:text-custom-black-40 hover:border-custom-black-40 focus:border-custom-black-40 focus:outline-none`}
            placeholder={placeholder}
        />
    )
}
