'use client'

import { useEffect, useState } from 'react'

import Image, { ImageProps } from 'next/image'

import { ImageNotFound } from './image-not-found'

export const ImageWithFallback = (props: ImageProps) => {
    const [error, setError] = useState<boolean | null>(null)

    useEffect(() => {
        setError(null)
    }, [props.src])

    if (error) {
        return <ImageNotFound />
    }

    return <Image {...props} src={props.src} alt={props.alt} onError={() => setError(true)} />
}
