type RadioProps = {
    id: string
    name: string
    value: string
    caption: string
    checked?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio = ({ id, name, value, caption, checked, onChange }: RadioProps) => {
    return (
        <div className="flex">
            <label htmlFor={id} className="group flex cursor-pointer justify-center gap-x-2">
                <div className="hover-animated flex h-5 w-5 flex-none items-center justify-center rounded-full border border-black-15 group-hover:border-black-40">
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
