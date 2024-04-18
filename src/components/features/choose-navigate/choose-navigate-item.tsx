'use client'

type ChooseNavigateItemProps = {
    caption: string
    onClick: () => void
}

export const ChooseNavigateItem = ({ caption, onClick }: ChooseNavigateItemProps) => {
    return (
        <div
            className="flex-center aspect-square flex-1 cursor-pointer rounded-lg bg-black-15 text-small"
            onClick={onClick}
        >
            {caption}
        </div>
    )
}
