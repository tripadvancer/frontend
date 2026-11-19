type PlaceHeaderTitleProps = {
    title: string
}

export const PlaceHeaderTitle = ({ title }: PlaceHeaderTitleProps) => {
    return <h1 className="h1 max-w-full wrap-break-word">{title}</h1>
}
