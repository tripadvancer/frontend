'use client'

type FormInputCoordinatesProps = {
    value: string
    onChange: (value: string | null) => void
}

export const FormInputCoordinates = ({ value, onChange }: FormInputCoordinatesProps) => {
    return <div className="text-big text-white">Coordinates</div>
}
