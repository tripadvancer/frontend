import classNames from 'classnames'

type UserMapCountriesFeedItemProps = {
    variant: 'orange' | 'blue'
    count: string
    name: string
}

export const UserMapCountriesFeedItem = ({ variant, count, name }: UserMapCountriesFeedItemProps) => {
    return (
        <div className="rounded-2xl bg-orange-10 p-4">
            <div
                className={classNames('h1', {
                    'text-orange-80': variant === 'orange',
                    'text-blue-80': variant === 'blue',
                })}
            >
                {count}
            </div>
            <div className="h7">{name}</div>
        </div>
    )
}
