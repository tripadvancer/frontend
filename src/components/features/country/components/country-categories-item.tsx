import classNames from 'classnames'

import Link from 'next/link'

type CountryCategoriesItemProps = {
    href: string | { query: string }
    caption: string
    isSelected: boolean
}

export const CountryCategoriesItem = ({ href, caption, isSelected }: CountryCategoriesItemProps) => {
    return (
        <Link
            href={href}
            scroll={false}
            replace={true}
            className={classNames(
                'flex-center h-8 cursor-pointer whitespace-nowrap rounded-full border border-blue-20 bg-blue-20 px-4 text-small text-blue-100 hover:border-blue-100 hover:bg-white',
                {
                    '!border-blue-100 bg-white': isSelected,
                },
            )}
        >
            {caption}
        </Link>
    )
}
