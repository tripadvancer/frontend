import { Roboto } from 'next/font/google'
import type { Metadata } from 'next/types'

import { TheFooter } from '@/components/TheFooter'
import { TheHeader } from '@/components/TheHeader'

import './globals.scss'

const roboto = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
    title: 'Tripadvancer - Plan your trip and find interesting places',
    description:
        'Tripadvancer will help you discover the world in a new way, find interesting places and go to an amazing trip.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={roboto.className}>
                <div className="flex min-h-screen flex-col antialiased">
                    <TheHeader />
                    <main className="relative z-0 flex-1 bg-green-100">{children}</main>
                    <TheFooter />
                </div>
            </body>
        </html>
    )
}
