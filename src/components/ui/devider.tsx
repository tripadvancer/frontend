import { ReactNode } from 'react'

type DeviderProps = {
    children: ReactNode
}

export const Devider = ({ children }: DeviderProps) => {
    return (
        <div className="relative text-center">
            <hr className="border-black-15 absolute top-1/2 right-0 left-0 z-0" />
            <span className="text-black-40 relative z-10 bg-white px-2 uppercase">{children}</span>
        </div>
    )
}
