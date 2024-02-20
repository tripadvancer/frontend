import classNames from 'classnames'

type IconChevronProps = {
    position: 'up' | 'down'
}

export const IconChevron = ({ position }: IconChevronProps) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className={classNames({
                'rotate-180 transform': position === 'down',
            })}
        >
            <path d="M12.5132 5L14 6.39012L8 12L2 6.39012L3.48679 5L8 9.21976L12.5132 5Z" />
        </svg>
    )
}
