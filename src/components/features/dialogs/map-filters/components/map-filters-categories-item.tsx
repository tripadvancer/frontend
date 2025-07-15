import classNames from 'classnames'

type MapFiltersCategoriesItemProps = {
    caption: string
    isSelected?: boolean
    onClick: () => void
}

export const MapFiltersCategoriesItem = ({ caption, isSelected, onClick }: MapFiltersCategoriesItemProps) => {
    return (
        <div
            className={classNames(
                'flex-center h-8 cursor-pointer whitespace-nowrap rounded-full border border-blue-20 bg-blue-20 px-4 text-small text-blue-100 hover:border-blue-100 hover:bg-white',
                {
                    '!border-blue-100 bg-white': isSelected,
                },
            )}
            onClick={onClick}
        >
            {caption}
        </div>
    )
}
