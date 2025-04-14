'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { useMediaQuery } from 'usehooks-ts'

export const LandingHeroBg = () => {
    const isMobile = useMediaQuery('(max-width: 639px)')
    const isTablet = useMediaQuery('(max-width: 1023px)')
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { innerWidth, innerHeight } = window
            const x = (event.clientX - innerWidth / 2) / (innerWidth / 2)
            const y = (event.clientY - innerHeight / 2) / (innerHeight / 2)
            setMousePosition({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    if (isMobile || isTablet) {
        return null
    }

    const layers = [
        { src: '/images/landing-hero-bg-1.svg', factor: 0 },
        { src: '/images/landing-hero-bg-2.svg', factor: -15 },
        { src: '/images/landing-hero-bg-3.svg', factor: 15 },
        { src: '/images/landing-hero-bg-4.svg', factor: 0 },
    ]

    return (
        <div className="absolute size-full overflow-hidden">
            {layers.map((layer, index) => (
                <motion.div
                    key={index}
                    className="absolute size-full bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${layer.src})`,
                    }}
                    animate={{
                        x: mousePosition.x * layer.factor,
                        y: mousePosition.y * layer.factor,
                    }}
                    transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                />
            ))}
        </div>
    )
}
