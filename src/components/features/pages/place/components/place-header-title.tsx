type PlaceHeaderTitleProps = {
    title: string
}

export const PlaceHeaderTitle = ({ title }: PlaceHeaderTitleProps) => {
    return <h1 className="h1 max-w-full break-words text-center text-white">{title}</h1>
}
