import { ReactNode } from 'react'

import { animated, useTransition } from '@react-spring/web'

import { CloseIcon24 } from '@/components/ui/icons'

type DialogProps = {
    content: ReactNode
    onClose: () => void
}

export const Dialog = ({ content, onClose }: DialogProps) => {
    const scale = useTransition(!!content, {
        from: { opacity: 0, transform: 'scale(0.9)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        config: { duration: 50 },
    })

    const fade = useTransition(!!content, {
        from: { opacity: 0 },
        enter: { opacity: 0.5 },
        config: { duration: 50 },
    })

    if (!content) {
        return null
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 overflow-y-auto p-4 sm:p-16">
            {fade(
                (style, item) =>
                    item && (
                        <animated.div style={style} className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black-100" />
                    ),
            )}
            <div className="flex-center min-h-full">
                {scale(
                    (style, item) =>
                        item && (
                            <animated.div
                                style={style}
                                className="relative z-50 w-full rounded-2xl bg-white px-8 py-16 shadow-lg sm:w-auto sm:p-16"
                            >
                                <div
                                    className="hover-animated absolute right-4 top-4 cursor-pointer text-black-15 hover:text-blue-active"
                                    onClick={onClose}
                                >
                                    <CloseIcon24 />
                                </div>
                                {content}
                            </animated.div>
                        ),
                )}
            </div>
        </div>
    )
}
