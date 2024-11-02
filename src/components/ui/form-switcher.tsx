import classNames from 'classnames'

type FormSwitcherProps = {
    checked: boolean
    isDisabled?: boolean
    onChange: () => void
}

export const FormSwitcher = ({ checked, isDisabled, onChange }: FormSwitcherProps) => {
    return (
        <div
            className={classNames('hover-animated relative h-5 w-7 flex-none cursor-pointer rounded-full', {
                'bg-black-15 hover:bg-black-40': !checked,
                'bg-blue-80 hover:bg-blue-active': checked,
            })}
            onClick={isDisabled ? undefined : onChange}
        >
            <div
                className={classNames('absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform', {
                    'translate-x-2': checked,
                })}
            />
        </div>
    )
}
