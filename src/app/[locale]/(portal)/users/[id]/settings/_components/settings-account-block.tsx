import classNames from 'classnames'

type SettingsAccountBlockProps = {
    title: string
    info: string
    action: string
    variant?: 'blue' | 'red'
    onClick: () => void
}

export const SettingsAccountBlock = ({ title, info, action, variant = 'blue', onClick }: SettingsAccountBlockProps) => {
    return (
        <div className="flex flex-col gap-y-4 border-t border-black-15 py-8 last:border-b">
            <div className="flex items-center justify-between">
                <div className="text-h7-m sm:text-h7">{title}</div>
                <div
                    className={classNames('font-bold', {
                        link: variant === 'blue',
                        'link-red': variant === 'red',
                    })}
                    onClick={onClick}
                >
                    {action}
                </div>
            </div>
            <p>{info}</p>
        </div>
    )
}
