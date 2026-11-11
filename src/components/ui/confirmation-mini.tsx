'use client'

type ConfirmationMiniProps = {
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmationMini = ({ onConfirm, onCancel }: ConfirmationMiniProps) => {
    return (
        <div className="flex gap-x-1">
            <span>Sure?</span>
            <span className="link-red" onClick={onConfirm}>
                Yes
            </span>
            <span>/</span>
            <span className="link-red" onClick={onCancel}>
                No
            </span>
        </div>
    )
}
